using Microsoft.EntityFrameworkCore;
using OnlineBookstore.Domain.Entities;

namespace OnlineBookstore.Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Book> Books => Set<Book>();
        public DbSet<Category> Categories => Set<Category>();
        public DbSet<User> Users => Set<User>();
        public DbSet<Order> Orders => Set<Order>();
        public DbSet<OrderDetail> OrderDetails => Set<OrderDetail>();
        public DbSet<Review> Reviews => Set<Review>();
        public DbSet<BookImage> BookImages => Set<BookImage>();
        public DbSet<BookCategory> BookCategories => Set<BookCategory>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // Many-To-Many : book <--> category
            modelBuilder.Entity<BookCategory>()
                .HasKey(bc => new
                {
                    bc.BookId,
                    bc.CategoryId
                });

            modelBuilder.Entity<BookCategory>()
               .HasOne(bc => bc.Book)
               .WithMany(b => b.BookCategories)
               .HasForeignKey(bc => bc.BookId);

            modelBuilder.Entity<BookCategory>()
                .HasOne(bc => bc.Category)
                .WithMany(c => c.BookCategories)
                .HasForeignKey(bc => bc.CategoryId);
            // One-To-Many : book --> bookimage
            modelBuilder.Entity<BookImage>()
                .HasOne(b => b.Book)
                .WithMany(i => i.Images)
                .HasForeignKey(b => b.BookId);
            // One-to-Many: User -> Orders
            modelBuilder.Entity<Order>()
                .HasOne(o => o.User)
                .WithMany(u => u.Orders)
                .HasForeignKey(o => o.UserId);
            // One-to-Many: Order -> OrderDetails
            modelBuilder.Entity<OrderDetail>()
                .HasOne(od => od.Order)
                .WithMany(o => o.OrderDetails)
                .HasForeignKey(od => od.OrderId);
            // One-to-Many: Book -> OrderDetails
            modelBuilder.Entity<OrderDetail>()
                .HasOne(od => od.Book)
                .WithMany(b => b.OrderDetails)
                .HasForeignKey(od => od.BookId);

            // One-to-Many: Book -> Reviews
            modelBuilder.Entity<Review>()
                .HasOne(r => r.Book)
                .WithMany(b => b.Reviews)
                .HasForeignKey(r => r.BookId);

            // One-to-Many: User -> Reviews
            modelBuilder.Entity<Review>()
                .HasOne(r => r.User)
                .WithMany(u => u.Reviews)
                .HasForeignKey(r => r.UserId);

            // Enum mapping (if needed explicitly)
            modelBuilder.Entity<User>()
                .Property(u => u.Role)
                .HasConversion<string>();

            modelBuilder.Entity<Order>()
                .Property(o => o.Status)
                .HasConversion<string>();
        }
    }
}
