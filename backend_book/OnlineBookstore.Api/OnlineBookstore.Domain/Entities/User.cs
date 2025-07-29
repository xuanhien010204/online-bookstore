namespace OnlineBookstore.Domain.Entities
{
    public enum Role
    {
        User,
        Admin
    }
    public class User
    {
        public long Id { get; set; }
        public string Email { get; set; } = default!;
        public string PasswordHash { get; set; } = default!;
        public string FirstName { get; set; } = default!;
        public string LastName { get; set; } = default!;
        public string? Gender { get; set; }
        public string? Address { get; set; }
        public string? Phone { get; set; }
        public Role Role { get; set; } = Role.User;
        public string? AvatarUrl { get; set; }

        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }

        public ICollection<Order> Orders { get; set; } = new List<Order>();
        public ICollection<Review> Reviews { get; set; } = new List<Review>();
    }

}