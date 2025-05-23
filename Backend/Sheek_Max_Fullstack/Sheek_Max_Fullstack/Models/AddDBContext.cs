using Microsoft.EntityFrameworkCore;

namespace Sheek_Max_Fullstack.Models
{
    public class AddDBContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<HistoryBuy> HistoryBuys {  get; set; }
        public DbSet<CartProduct> CartProducts { get; set; }
        
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql("Host=localhost;Database=postgres;Username=postgres;Password=123");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

        }
    }

}
