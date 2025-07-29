namespace OnlineBookstore.Domain.Entities
{
    public class OrderDetail
    {
        public long Id { get; set; }

        public long OrderId { get; set; }
        public Order Order { get; set; } = default!;

        public long BookId { get; set; }
        public Book Book { get; set; } = default!;

        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
    }

}
