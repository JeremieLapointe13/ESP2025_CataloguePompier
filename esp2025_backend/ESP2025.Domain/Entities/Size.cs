namespace ESP2025.Domain.Entities;

public class Size
{
    public int IdSize { get; set; }
    public string Status { get; set; } = null!;

    // Navigation properties
    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}