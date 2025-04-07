using ESP2025.Domain.Entities;

namespace ESP2025.Application.DTOS;

public class CreateUserDto
{
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
    public string Password { get; set; } = null!;

    // Méthode pour convertir en entité User
    public User ToEntity()
    {
        return new User
        {
            GradeId = this.GradeId,
            Email = this.Email,
            Ville = this.Ville,
            Province = this.Province,
            Pays = this.Pays,
            NoMatricule = this.NoMatricule,
            FirstName = this.FirstName,
            LastName = this.LastName,
            Points = this.Points,
            IsAdmin = this.IsAdmin,
            IsActive = this.IsActive ?? true,
            LoginAttempts = 0
        };
    }
}