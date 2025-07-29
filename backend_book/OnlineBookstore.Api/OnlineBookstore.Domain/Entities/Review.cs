namespace OnlineBookstore.Domain.Entities
{
    public class Review
    {
        public long Id { get; set; }

        public long BookId { get; set; }
        public Book Book { get; set; } = default!;

        public long UserId { get; set; }
        public User User { get; set; } = default!;

        public int Rating { get; set; }
        public string Comment { get; set; } = default!;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

}
