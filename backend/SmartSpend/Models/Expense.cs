using System.ComponentModel.DataAnnotations;

namespace SmartSpend.Models
{
    public class Expense
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public decimal Amount { get; set; }
        public DateOnly Date { get; set; }

        public int? CategoryId { get; set; }
        public Category? Category { get; set; }

        public string? UserId { get; set; }

        public User? User { get; set; }
    }
}
