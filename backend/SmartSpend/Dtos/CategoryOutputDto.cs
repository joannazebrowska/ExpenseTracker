using SmartSpend.Models;

namespace SmartSpend.Dtos
{
    public class CategoryOutputDto
    {
        public int Id { get; set; }
        public string CategoryName { get; set; }

        public static CategoryOutputDto FromModel(Category category)
        {
            return new CategoryOutputDto
            {
                Id = category.Id,
                CategoryName = category.CategoryName
            };
        }
    }
}
