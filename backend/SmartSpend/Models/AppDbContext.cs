using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace SmartSpend.Models
{
    public class AppDbContext : IdentityDbContext<User>
    {
        public AppDbContext(DbContextOptions<AppDbContext> option) : base(option)
        {

        }

        public DbSet<Expense> Expenses { get; set; }

        public DbSet<Category> Category { get; set; }
        public DbSet<BudgetLimit> BudgetLimit {  get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>().Property(u => u.Initials).HasMaxLength(5);

            modelBuilder.Entity<BudgetLimit>()
                .HasIndex(b => new { b.UserId, b.Month, b.Year })
                .IsUnique();
        }
    }
}