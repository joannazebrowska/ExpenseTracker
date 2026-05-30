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
    public class CategoriesController : ControllerBase
    {
        private readonly AppDbContext _context;
        public CategoriesController(AppDbContext context)
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
        public async Task<IActionResult> Get()
        {
            var userId = GetUserId();

            if (userId == null)
                return Unauthorized();

            var data = await _context.Category
                .Where(x => x.UserId == userId)
                .ToListAsync();

            var result = data.Select(CategoryOutputDto.FromModel);

            return Ok(result);
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetByID(int id)
        {
            var userId = GetUserId();

            if (userId == null)
                return Unauthorized();

            var data = await _context.Category
                .Where(x => x.UserId == userId)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (data == null)
            {
                return NotFound();
            }

            var result = CategoryOutputDto.FromModel(data);

            return Ok(result);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CategoryInputDto category)
        {
            var id = GetUserId();

            if (id == null)
                return Unauthorized();

            var model = category.ToModel();

            model.UserId = id;

            var createdEntity = _context.Category.Add(model);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), createdEntity.Entity);
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] CategoryInputDto category)
        {
            var userId = GetUserId();

            if (userId == null)
                return Unauthorized();

            if (category == null || id == 0)
            {
                return BadRequest();
            }

            var data = await _context.Category
                .Where(x => x.UserId == userId)
                .FirstOrDefaultAsync(x => x.Id == id);
            if (data == null)
                return NotFound();

            data.CategoryName = category.CategoryName;

            await _context.SaveChangesAsync();
            return NoContent(); 
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var userId = GetUserId();

            if (userId == null)
                return Unauthorized();


            var category = await _context.Category
                .Where(x => x.UserId == userId)
                .FirstOrDefaultAsync(x => x.Id == id);
            if (category == null)
                return NotFound();

            _context.Category.Remove(category);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
