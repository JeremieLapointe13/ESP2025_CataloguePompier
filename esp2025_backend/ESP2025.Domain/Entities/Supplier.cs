namespace ESP2025.Domain.Entities;

public class Supplier
{
    public int IdSupplier { get; set; }
    public string Name { get; set; } = null!;
    public string Adress { get; set; } = null!;
    public string? PhoneNumber { get; set; }

    // Navigation properties
    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}