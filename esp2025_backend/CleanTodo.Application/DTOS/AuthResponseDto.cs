namespace ESP2025.Application.DTOS;

public class AuthResponseDto
{
    public string Token { get; set; } = null!;
    public int IdUser { get; set; }
    public string Email { get; set; } = null!;
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public bool IsAdmin { get; set; }
    public DateTime Expiration { get; set; }
}
