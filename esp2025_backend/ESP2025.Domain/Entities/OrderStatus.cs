namespace ESP2025.Domain.Entities;

public class OrderStatus
{
    public int IdOrderStatus { get; set; }
    public string Status { get; set; } = null!;

    // Navigation properties
    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}