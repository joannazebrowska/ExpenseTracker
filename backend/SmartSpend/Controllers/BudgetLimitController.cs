using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartSpend.Dtos;
using SmartSpend.Models;
using System.Security.Claims;

namespace SmartSpend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BudgetLimitController : ControllerBase
    {
        private readonly AppDbContext _context;
        public BudgetLimitController(AppDbContext context)
        {
            _context = context;
        }


        private string? GetUserId()
        {
            var userId = HttpContext?.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier);
            return userId == null ? null : userId.Value;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> Get([FromQuery] int month, [FromQuery] int year)
        {
            var userId = GetUserId();

            if (userId == null)
                return Unauthorized();

            var data = await _context.BudgetLimit
                .Where(x => x.UserId == userId && x.Month == month && x.Year == year)
                .ToListAsync();

            return Ok(data);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post([FromBody] BudgetLimitInputDto budget)
        {
            var userId = GetUserId();

            if (userId == null)
                return Unauthorized();

            var existing = await _context.BudgetLimit
                .Where(x => x.UserId == userId && x.Month == budget.Month && x.Year == budget.Year)
                .FirstOrDefaultAsync();

            if (existing != null)
            {
                existing.Amount = budget.Amount;
            } 
            else
            {
                var newLimit = budget.ToModel();
                newLimit.UserId = userId;
                _context.BudgetLimit.Add(newLimit);
            }

            await _context.SaveChangesAsync();
            return Ok();
        }

        [Authorize]
        [HttpGet("budgetprogress")]
        public async Task<IActionResult> GetStatus([FromQuery] int month, [FromQuery] int year)
        {
            var userId = GetUserId();

            if (userId == null)
                return Unauthorized();

            var limit = await _context.BudgetLimit
                .Where(x => x.UserId == userId && x.Month == month && x.Year == year)
                .FirstOrDefaultAsync();

            var totalSpent = await _context.Expenses
                .Where(x => x.UserId == userId && x.Date.Month == month && x.Date.Year == year)
                .SumAsync(x => x.Amount);

            var result = new
            {
                Limit = limit?.Amount,
                Spent = totalSpent,
                Remaining = limit != null ? limit.Amount - totalSpent : (decimal?)null
            };

            return Ok(result);
        }

    }
}
