namespace OnlineBookstore.Domain.Entities
{
    public class BookImage
    {
        public long Id { get; set; }
        public long BookId { get; set; }
        public Book Book { get; set; } = default!;
        public string ImageUrl { get; set; } = default!;

    }
}
