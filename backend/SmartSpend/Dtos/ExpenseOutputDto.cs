using SmartSpend.Models;

namespace SmartSpend.Dtos
{
    public class ExpenseOutputDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Amount { get; set; }
        public DateOnly Date { get; set; }

        public int? CategoryId { get; set; }
        public string? CategoryName { get; set; }

        public static ExpenseOutputDto FromModel(Expense expense)
        {
            return new ExpenseOutputDto
            {
                Id = expense.Id,
                Name = expense.Name,
                Amount = expense.Amount,
                Date = expense.Date,
                CategoryId = expense.Category?.Id,
                CategoryName = expense.Category?.CategoryName,
            };
        }
    }
}
