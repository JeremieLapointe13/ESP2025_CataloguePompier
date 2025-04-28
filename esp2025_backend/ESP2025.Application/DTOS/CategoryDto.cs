namespace ESP2025.Application.DTOS;

public class CategoryDto
{
    public int IdCategory { get; set; }
    public int? ParentId { get; set; }
    public string Name { get; set; } = null!;
    public string? Description { get; set; }
    public int Level { get; set; }
    public List<CategoryDto>? Subcategories { get; set; }

    public static List<CategoryDto> BuildHierarchy(List<ESP2025.Domain.Entities.Category> allCategories)
    {
        // Convertir toutes les catégories en DTOs
        var categoryDtos = allCategories.Select(c => new CategoryDto
        {
            IdCategory = c.IdCategory,
            ParentId = c.ParentId,
            Name = c.Name,
            Description = c.Description,
            Level = c.Level,
            Subcategories = new List<CategoryDto>()
        }).ToList();

        // Créer un dictionnaire pour un accès rapide par ID
        var categoryDict = categoryDtos.ToDictionary(c => c.IdCategory);

        // Construire la hiérarchie
        var rootCategories = new List<CategoryDto>();
        foreach (var category in categoryDtos)
        {
            if (category.ParentId == null)
            {
                // C'est une catégorie racine
                rootCategories.Add(category);
            }
            else if (categoryDict.TryGetValue(category.ParentId.Value, out var parent))
            {
                // Ajouter aux sous-catégories du parent
                parent.Subcategories.Add(category);
            }
        }

        return rootCategories;
    }
    public static List<CategoryDto> ConvertAllCategories(List<ESP2025.Domain.Entities.Category> allCategories)
    {
        // Transforme toutes les catégories en DTOs
        return allCategories.Select(c => new CategoryDto
        {
            IdCategory = c.IdCategory,
            ParentId = c.ParentId,
            Name = c.Name,
            Description = c.Description,
            Level = c.Level
        }).ToList();
    }
}