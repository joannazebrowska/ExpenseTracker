using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SmartSpend.Migrations
{
    /// <inheritdoc />
    public partial class AddUniqueIndexToBudgetLimit : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_BudgetLimit_UserId",
                table: "BudgetLimit");

            migrationBuilder.CreateIndex(
                name: "IX_BudgetLimit_UserId_Month_Year",
                table: "BudgetLimit",
                columns: new[] { "UserId", "Month", "Year" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_BudgetLimit_UserId_Month_Year",
                table: "BudgetLimit");

            migrationBuilder.CreateIndex(
                name: "IX_BudgetLimit_UserId",
                table: "BudgetLimit",
                column: "UserId");
        }
    }
}
