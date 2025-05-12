using System.Drawing;

namespace ESP2025.Domain.Entities;

public class Product
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
    public bool IsActive { get; set; } = true;
    public int Quantity { get; set; }

    public virtual Category Category { get; set; } = null!;
    public virtual Supplier Supplier { get; set; } = null!;
    public virtual Size Size { get; set; } = null!;
    public virtual FabricType? FabricType { get; set; }
}