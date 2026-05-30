using SmartSpend.Models;
using System.Reflection.Metadata.Ecma335;

namespace SmartSpend.Dtos
{
    public class CategoryInputDto
    {
        public string CategoryName { get; set; }

        public Category ToModel()
        {
            return new Category
            {
                CategoryName = CategoryName,
            };
        }
    }
}
