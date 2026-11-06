namespace SmartSpend.Models
{
    public class BudgetLimit
    {
        public int Id { get; set; }
        public decimal Amount { get; set; }
        public int Month { get; set; }
        public int Year { get; set; }
        public string? UserId {  get; set; }
        public User? User { get; set; }
    }
}
