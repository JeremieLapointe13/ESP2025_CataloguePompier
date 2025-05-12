namespace ESP2025.Domain.Entities;

public class OrderItem
{
    public int IdOrderItem { get; set; }
    public int OrderId { get; set; }
    public int ProductId { get; set; }
    public int SizeId { get; set; }
    public int Quantity { get; set; }
    public int PointsAtPurchase { get; set; }

    // Navigation properties
    public virtual Order Order { get; set; } = null!;
    public virtual Product Product { get; set; } = null!;
    public virtual Size Size { get; set; } = null!;
}