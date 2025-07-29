namespace OnlineBookstore.Domain.Entities
{
    public class Order
    {
        public long Id { get; set; }
        public long UserId { get; set; }
        public User User { get; set; } = default!;

        public DateTime OrderDate { get; set; } = DateTime.UtcNow;
        public decimal TotalAmount { get; set; }
        public string Status { get; set; } = "Pending";
        public string ShippingAddress { get; set; } = default!;

        public ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();
    }

}
