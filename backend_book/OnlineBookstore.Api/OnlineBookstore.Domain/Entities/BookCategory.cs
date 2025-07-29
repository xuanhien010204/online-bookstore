namespace OnlineBookstore.Domain.Entities
{
    public class BookCategory
    {
        public long BookId { get; set; }
        public Book Book { get; set; } = default!;

        public long CategoryId { get; set; }
        public Category Category { get; set; } = default!;
    }
}
