using ESP2025.Domain.Entities;

namespace ESP2025.Application.DTOS;

public class ProductDto
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

    // Entitées liées aux produits
    public string? CategoryName { get; set; }
    public string? SupplierName { get; set; }
    public string? SizeStatus { get; set; }
    public string? FabricTypeName { get; set; }

    public ProductDto() { }

    public ProductDto(Product product)
    {
        IdProduct = product.IdProduct;
        CategoryId = product.CategoryId;
        SupplierId = product.SupplierId;
        SizeId = product.SizeId;
        FabricTypeId = product.FabricTypeId;
        ProductNo = product.ProductNo;
        Name = product.Name;
        Points = product.Points;
        Description = product.Description;
        ImageURL = product.ImageURL;
        IsActive = product.IsActive;
        Quantity = product.Quantity;

        // Informations des entités liées
        CategoryName = product.Category?.Name;
        SupplierName = product.Supplier?.Name;
        SizeStatus = product.Size?.Status;
        FabricTypeName = product.FabricType?.Name;
    }
}