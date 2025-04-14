namespace ESP2025.Application.DTOS;

public class RegisterRequestDto
{
    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public string Ville { get; set; } = null!;
    public string Province { get; set; } = null!;
    public string Pays { get; set; } = null!;
    public int NoMatricule { get; set; }
}
