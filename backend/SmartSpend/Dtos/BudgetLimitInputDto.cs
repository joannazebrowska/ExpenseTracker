using SmartSpend.Models;

namespace SmartSpend.Dtos
{
    public class BudgetLimitInputDto
    {
        public decimal Amount { get; set; }
        public int Month { get; set; }
        public int Year { get; set; }

        public BudgetLimit ToModel()
        {
            return new BudgetLimit
            {
                Amount = Amount,
                Month = Month,
                Year = Year
            };
        }
    }
}
