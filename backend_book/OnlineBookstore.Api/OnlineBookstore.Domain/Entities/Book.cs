namespace OnlineBookstore.Domain.Entities
{
    public class Book
    {
        public long Id { get; set; }
        public string Title { get; set; } = default!;
        public string Author { get; set; } = default!;
        public decimal Price { get; set; }
        public string? Description { get; set; }
        public int Stock { get; set; }

        public ICollection<BookCategory> BookCategories { get; set; } = new List<BookCategory>();
        public ICollection<BookImage> Images { get; set; } = new List<BookImage>();
        public ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();
        public ICollection<Review> Reviews { get; set; } = new List<Review>();

    }
}
