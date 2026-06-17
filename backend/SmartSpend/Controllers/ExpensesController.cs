using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using SmartSpend.Dtos;
using SmartSpend.Models;
using System.Security.Claims;

namespace SmartSpend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExpensesController : ControllerBase
    {
        private readonly AppDbContext _context;
        public ExpensesController(AppDbContext context)
        {
            _context = context;
        }


        //stworzyc oddzielna klase BaseController dziedziczaca po ControllerBase i wrzucic do niej getUserId, kontrolery dziedzicza
        private string? GetUserId()
        {
            var userId = HttpContext?.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier);
            return userId == null ? null : userId.Value;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> Get()
        {
            // zrobic oddzielna metode GetUserId(HttpContext)
            // stworzyc jeszcze jedno DTO aby nie wysylac na front tylu danych 
            var userId = GetUserId();

            if (userId == null)
                return Unauthorized();

            var data = await _context.Expenses
                .Include(x => x.Category)
                .Where(x => x.UserId == userId)
                .ToListAsync();

            var result = data.Select(ExpenseOutputDto.FromModel);

            return Ok(result);
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetByID(int id)
        {
            var userId = GetUserId();

            if (userId == null)
                return Unauthorized(); 

            var data = await _context.Expenses
                .Where(x => x.UserId == userId)
                .FirstOrDefaultAsync(x => x.Id == id);

            if(data == null)
            {
                return NotFound();
            }

            var result = ExpenseOutputDto.FromModel(data);

            return Ok(result);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ExpenseInputDto expense)
        {
            var id = GetUserId();

            if (id == null)
                return Unauthorized();

            var model = expense.ToModel();

            model.UserId = id;

            var createdEntity = _context.Expenses.Add(model);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), createdEntity.Entity); 
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] ExpenseInputDto expense)
        {
            var userId = GetUserId();

            if (userId == null)
                return Unauthorized();

            if (expense == null || id == 0)
            {
                return BadRequest();
            }

            var data = await _context.Expenses
                .Where(x => x.UserId == userId)
                .FirstOrDefaultAsync(x => x.Id == id);
            if (data == null)
                return NotFound();

            data.Name = expense.Name;
            data.Amount = expense.Amount;
            data.Date = expense.Date;
            data.CategoryId = expense.CategoryId;

            await _context.SaveChangesAsync();
            return NoContent(); //powinno byc NoContent() zgonie z normami rest api, bo po aktualizacji danych juz nie mamy co zwracac
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var userId = GetUserId();

            if (userId == null) 
                return Unauthorized();


            var expense = await _context.Expenses
                .Where(x => x.UserId == userId)
                .FirstOrDefaultAsync(x =>x.Id == id);
            if (expense == null)
                return NotFound();

            _context.Expenses.Remove(expense);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // wczesna materializacja!przerobic
        [Authorize]
        [HttpGet("summary")]
        public async Task<IActionResult> GetSummary()
        {
            var userId = GetUserId();

            if (userId == null)
                return Unauthorized();

            var result = await _context.Expenses
                .Where(x => x.UserId == userId)
                .GroupBy(x => x.Category != null ? x.Category.CategoryName : "Niepogrupowane")
                .Select(g => new
                {
                    CategoryName = g.Key,
                    Total = g.Sum(expense => expense.Amount)
                })
                .ToListAsync();

            return Ok(result);
        }

        [Authorize]
        [HttpGet("monthlydata")]
        public async Task<IActionResult> GetMonthly()
        {
            var userId = GetUserId();

            if (userId == null) return Unauthorized();

            var result = await _context.Expenses
                .Where(x => x.UserId == userId)
                .GroupBy(x => new { x.Date.Year, x.Date.Month })
                .Select(g => new
                {
                    g.Key.Year,
                    g.Key.Month,
                    Total = g.Sum(expense => expense.Amount)
                })
                .ToListAsync();

            return Ok(result);
        }


    }
}
