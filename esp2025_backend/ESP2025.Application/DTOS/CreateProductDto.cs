using ESP2025.Domain.Entities;

namespace ESP2025.Application.DTOS;

public class CreateProductDto
{
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

    public Product ToEntity()
    {
        return new Product
        {
            CategoryId = CategoryId,
            SupplierId = SupplierId,
            SizeId = SizeId,
            FabricTypeId = FabricTypeId,
            ProductNo = ProductNo,
            Name = Name,
            Points = Points,
            Description = Description,
            ImageURL = ImageURL,
            IsActive = IsActive,
            Quantity = Quantity
        };
    }
}
