namespace ESP2025.Application.DTOS;

public class OrderItemDetailDto
{
    public int IdOrderItem { get; set; }
    public int ProductId { get; set; }
    public int SizeId { get; set; }
    public int Quantity { get; set; }
    public int PointsAtPurchase { get; set; }
    public string ProductName { get; set; } = null!;
    public string SizeStatus { get; set; } = null!;
}