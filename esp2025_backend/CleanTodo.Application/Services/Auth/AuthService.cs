using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ESP2025.Application.DTOS;
using ESP2025.Domain.Entities;
using ESP2025.Domain.Interfaces.Repositories;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;

namespace ESP2025.Application.Services.Auth;

public class AuthService : IAuthService
{
    private readonly IAuthRepository _authRepository;
    private readonly IConfiguration _configuration;

    public AuthService(IAuthRepository authRepository, IConfiguration configuration)
    {
        _authRepository = authRepository;
        _configuration = configuration;
    }

    public async Task<AuthResponseDto> Login(LoginRequestDto loginRequest)
    {
        // Trouver l'utilisateur par email
        var user = await _authRepository.FindByEmail(loginRequest.Email);
        if (user == null)
        {
            throw new Exception("Invalid email or password");
        }

        // Vérifier si l'utilisateur est actif
        if (user.IsActive != true)
        {
            throw new Exception("Account is inactive");
        }

        // Vérifier le mot de passe
        bool validPassword = BCrypt.Net.BCrypt.Verify(loginRequest.Password, user.Password);
        if (!validPassword)
        {
            // Augmenter le compteur de tentatives échouées
            await _authRepository.IncrementLoginAttempts(user.IdUser);
            throw new Exception("Invalid email or password");
        }

        // Réinitialiser le compteur de tentatives de connexion en cas de réussite
        if (user.LoginAttempts > 0)
        {
            await _authRepository.ResetLoginAttempts(user.IdUser);
        }

        // Générer le token JWT
        string token = GenerateJwtToken(user);

        // Calculer la date d'expiration
        var expiry = int.Parse(_configuration["JwtSettings:ExpiryMinutes"] ?? "60");
        var expiration = DateTime.UtcNow.AddMinutes(expiry);

        // Créer la réponse de login
        return new AuthResponseDto
        {
            Token = token,
            IdUser = user.IdUser,
            Email = user.Email,
            FirstName = user.FirstName,
            LastName = user.LastName,
            IsAdmin = user.IsAdmin,
            Expiration = expiration
        };
    }

    public string GenerateJwtToken(User user)
    {
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:SecretKey"]!));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.IdUser.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Name, $"{user.FirstName} {user.LastName}"),
            new Claim(ClaimTypes.Role, user.IsAdmin ? "Admin" : "User")
        };

        var expiry = int.Parse(_configuration["JwtSettings:ExpiryMinutes"] ?? "60");

        var handler = new JsonWebTokenHandler();
        var token = handler.CreateToken(new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddMinutes(expiry),
            Issuer = _configuration["JwtSettings:Issuer"],
            Audience = _configuration["JwtSettings:Audience"],
            SigningCredentials = credentials
        });

        return token;
    }
}