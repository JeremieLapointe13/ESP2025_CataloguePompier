using ESP2025.Domain.Entities;

namespace ESP2025.Application.DTOS;

public class UserDto
{
    public int IdUser { get; set; }
    public int? GradeId { get; set; }
    public string Email { get; set; } = null!;
    public string Ville { get; set; } = null!;
    public string Province { get; set; } = null!;
    public string Pays { get; set; } = null!;
    public int NoMatricule { get; set; }
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public int Points { get; set; }
    public bool IsAdmin { get; set; }
    public bool? IsActive { get; set; }
    public string? GradeNom { get; set; }

    public UserDto() { }

    // Mapping depuis l'entité
    public UserDto(User user)
    {
        IdUser = user.IdUser;
        GradeId = user.GradeId;
        Email = user.Email;
        Ville = user.Ville;
        Province = user.Province;
        Pays = user.Pays;
        NoMatricule = user.NoMatricule;
        FirstName = user.FirstName;
        LastName = user.LastName;
        Points = user.Points;
        IsAdmin = user.IsAdmin;
        IsActive = user.IsActive;
        GradeNom = user.Grade?.NomGrade;
    }
}