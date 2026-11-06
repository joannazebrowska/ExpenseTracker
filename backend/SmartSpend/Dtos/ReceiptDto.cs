
namespace SmartSpend.Dtos
{
    public class ReceiptItemDto
    {
        public string? Name { get; set; }
        public decimal? Quantity { get; set; }
        public decimal? UnitPrice { get; set; }
        public decimal? TotalPrice { get; set; }
    }

    public class ReceiptDto
    {
        public string? Store {  get; set; }
        public string? Date { get; set; }
        public List<ReceiptItemDto> Items { get; set; } = new();
        public decimal? Total { get; set; }
    }
}
