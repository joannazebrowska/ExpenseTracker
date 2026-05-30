using SmartSpend.Models;
using System.ComponentModel.DataAnnotations;

namespace SmartSpend.Dtos
{
    public class ExpenseInputDto
    {
        [Required]
        public string Name { get; set; } 
        [Required]
        public decimal Amount { get; set; }
        [Required]
        public DateOnly Date { get; set; }

        public int? CategoryId { get; set; }

        public Expense ToModel()
        {
            return new Expense
            {
                Name = Name,
                Amount = Amount,
                Date = Date,
                CategoryId = CategoryId
            };
        }
    }
}
