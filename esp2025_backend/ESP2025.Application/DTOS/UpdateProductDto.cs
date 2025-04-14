namespace ESP2025.Application.DTOS;

public class UpdateProductDto
{
    public int IdProduct { get; set; }
    public int CategoryId { get; set; }
    public int SupplierId { get; set; }
    public int SizeId { get; set; }
    public int? FabricTypeId { get; set; }
    public string ProductNo { get; set; } = null!;
    public string Name { get; set; } = null!;
    public int Points { get; set; }
    public string? Description { get; set; }
    public string? ImageURL { get; set; }
    public bool IsActive { get; set; }
    public int Quantity { get; set; }
}