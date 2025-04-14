using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ESP2025.Application.DTOS;
using ESP2025.Application.Exceptions;
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

    public async Task<AuthResponseDto> Register(RegisterRequestDto registerRequest)
    {
        if (await _authRepository.EmailExists(registerRequest.Email))
        {
            throw new Exception("Email already exists");
        }

        var user = new User
        {
            Email = registerRequest.Email,
            Password = BCrypt.Net.BCrypt.HashPassword(registerRequest.Password),
            FirstName = registerRequest.FirstName,
            LastName = registerRequest.LastName,
            Ville = registerRequest.Ville,
            Province = registerRequest.Province,
            Pays = registerRequest.Pays,
            NoMatricule = registerRequest.NoMatricule,
            IsAdmin = false,
            IsActive = true,
            Points = 0,
            LoginAttempts = 0
        };

        var createdUser = await _authRepository.Register(user);

        string token = GenerateJwtToken(createdUser);

        var expiry = int.Parse(_configuration["JwtSettings:ExpiryMinutes"] ?? "60");
        var expiration = DateTime.UtcNow.AddMinutes(expiry);

        return new AuthResponseDto
        {
            Token = token,
            IdUser = createdUser.IdUser,
            Email = createdUser.Email,
            FirstName = createdUser.FirstName,
            LastName = createdUser.LastName,
            IsAdmin = createdUser.IsAdmin,
            Expiration = expiration
        };
    }

    public async Task<AuthResponseDto> Login(LoginRequestDto loginRequest)
    {
        var user = await _authRepository.FindByEmail(loginRequest.Email);
        if (user == null)
        {
            throw new Exception("Invalid email or password");
        }

        if (user.IsActive != true)
        {
            throw new Exception("Account is inactive");
        }

        bool validPassword = BCrypt.Net.BCrypt.Verify(loginRequest.Password, user.Password);
        if (!validPassword)
        {
            await _authRepository.IncrementLoginAttempts(user.IdUser);
            throw new Exception("Invalid email or password");
        }

        if (user.LoginAttempts > 0)
        {
            await _authRepository.ResetLoginAttempts(user.IdUser);
        }

        string token = GenerateJwtToken(user);

        var expiry = int.Parse(_configuration["JwtSettings:ExpiryMinutes"] ?? "60");
        var expiration = DateTime.UtcNow.AddMinutes(expiry);

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