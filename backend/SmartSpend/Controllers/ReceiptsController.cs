using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.AI;
using Microsoft.Extensions.Hosting;
using OllamaSharp;
using SmartSpend.Dtos;
using SmartSpend.Models;
using SmartSpend.Services;
using System.Diagnostics;
using System.Security.Claims;

namespace SmartSpend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReceiptsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ReceiptsService _receiptsService;

        public ReceiptsController(ReceiptsService receiptsService, AppDbContext context)
        {

            _receiptsService = receiptsService;
            _context = context;
        }
        private string? GetUserId()
        {
            var userId = HttpContext?.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier);
            return userId == null ? null : userId.Value;
        }

        [HttpPost("scan")]
        [Authorize]
        public async Task<IActionResult> Scan(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("dupa");
            }

            if (file.ContentType != "image/jpeg" && file.ContentType != "image/png")
            {
                return BadRequest("dozwolone sa tylko formaty jpg i png");
            }
            
            try
            {
                var result = await _receiptsService.ScanReceiptAsync(file);

                if (result?.Items == null || result.Items.Count == 0)
                {
                    return UnprocessableEntity("nie udalo sie odczytac paragonu");
                }

                return Ok(result);
            } catch (HttpRequestException)
            {
                return StatusCode(503, "obecnie usluga ollama jest niedostepna");
            }
        }

        [Authorize]
        [HttpPost("confirm")]
        public async Task<IActionResult> Confirm([FromBody] List<ExpenseInputDto> expenses)
        {
            var userId = GetUserId();
            if (userId == null)
            {
                return Unauthorized();
            }

            if (expenses == null || expenses.Count == 0)
            {
                return BadRequest();
            }

            var newExpenses = new List<Expense>();

            foreach (var item in expenses)
            {
                var model = item.ToModel();
                model.UserId = userId;
                newExpenses.Add(model);
            }

            _context.Expenses.AddRange(newExpenses);
            await _context.SaveChangesAsync();

            return Ok(newExpenses);

        }

    }
}
