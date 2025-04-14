namespace ESP2025.Domain.Entities;

public class Category
{
    public int IdCategory { get; set; }
    public int? ParentId { get; set; }
    public string Name { get; set; } = null!;
    public string? Description { get; set; }
    public int Level { get; set; }

    // Navigation properties
    public virtual Category? Parent { get; set; }
    public virtual ICollection<Category> Children { get; set; } = new List<Category>();
    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}