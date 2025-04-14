namespace ESP2025.Domain.Entities;

public class FabricType
{
    public int IdFabricType { get; set; }
    public string Name { get; set; } = null!;

    // Navigation properties
    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}