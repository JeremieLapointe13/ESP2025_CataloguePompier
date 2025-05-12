using ESP2025.Application.DTOS;
using ESP2025.Domain.Entities;
using ESP2025.Application.Services.Auth;
using ESP2025.Application.UseCase.Auth;
using ESP2025.Domain.Interfaces.Repositories;
using Microsoft.Extensions.Configuration;
using Moq;
using System.Text;

namespace ESP2025.ApplicationTests;

public class AuthTests
{
    private Mock<IAuthRepository> _authRepositoryMock;
    private Mock<IConfiguration> _configurationMock;
    private AuthService _authService;
    private LoginUseCase _loginUseCase;

    User user1 = new User
    {
        IdUser = 1,
        Email = "test@example.com",
        FirstName = "Test",
        LastName = "User",
        Password = BCrypt.Net.BCrypt.HashPassword("Password123"),
        IsAdmin = false,
        IsActive = true,
        LoginAttempts = 0
    };

    [SetUp]
    public void Setup()
    {
        _authRepositoryMock = new Mock<IAuthRepository>();
        _configurationMock = new Mock<IConfiguration>();

        // Configuration pour JWT
        var configSectionMock = new Mock<IConfigurationSection>();
        configSectionMock.Setup(s => s["SecretKey"]).Returns("8ee78233e6c7595dd20032e01eec1719");
        configSectionMock.Setup(s => s["Issuer"]).Returns("ESP2025Api");
        configSectionMock.Setup(s => s["Audience"]).Returns("ESP2025Client");
        configSectionMock.Setup(s => s["ExpiryMinutes"]).Returns("60");

        _configurationMock.Setup(c => c.GetSection("JwtSettings")).Returns(configSectionMock.Object);
        _configurationMock.Setup(c => c["JwtSettings:SecretKey"]).Returns("8ee78233e6c7595dd20032e01eec1719");
        _configurationMock.Setup(c => c["JwtSettings:Issuer"]).Returns("ESP2025Api");
        _configurationMock.Setup(c => c["JwtSettings:Audience"]).Returns("ESP2025Client");
        _configurationMock.Setup(c => c["JwtSettings:ExpiryMinutes"]).Returns("60");

        _authService = new AuthService(_authRepositoryMock.Object, _configurationMock.Object);
        _loginUseCase = new LoginUseCase(_authService);

        // Mock du repository
        _authRepositoryMock.Setup(repo => repo.FindByEmail("test@example.com")).ReturnsAsync(user1);
        _authRepositoryMock.Setup(repo => repo.IncrementLoginAttempts(It.IsAny<int>())).Returns(Task.CompletedTask);
        _authRepositoryMock.Setup(repo => repo.ResetLoginAttempts(It.IsAny<int>())).Returns(Task.CompletedTask);
    }

    [Test]
    public async Task Login_WithValidCredentials_ShouldReturnAuthResponse()
    {
        // Arrange
        var loginRequest = new LoginRequestDto
        {
            Email = "test@example.com",
            Password = "Password123"
        };

        // Act
        var result = await _loginUseCase.Execute(loginRequest);

        // Assert
        Assert.That(result, Is.Not.Null, "Auth response is returned");
        Assert.That(result.Token, Is.Not.Null, "Token is generated");
        Assert.That(result.IdUser, Is.EqualTo(user1.IdUser), "Correct user ID is returned");
        Assert.That(result.Email, Is.EqualTo(user1.Email), "Correct email is returned");
    }

    [Test]
    public void Login_WithInvalidEmail_ShouldThrowException()
    {
        // Arrange
        var loginRequest = new LoginRequestDto
        {
            Email = "nonexistent@example.com",
            Password = "Password123"
        };

        // Act & Assert
        Assert.ThrowsAsync<Exception>(async () => await _loginUseCase.Execute(loginRequest));
    }

    [Test]
    public void Login_WithInvalidPassword_ShouldThrowException()
    {
        // Arrange
        var loginRequest = new LoginRequestDto
        {
            Email = "test@example.com",
            Password = "WrongPassword"
        };

        // Act & Assert
        Assert.ThrowsAsync<Exception>(async () => await _loginUseCase.Execute(loginRequest));
    }

    [Test]
    public void Login_WithInactiveAccount_ShouldThrowException()
    {
        // Arrange
        var inactiveUser = new User
        {
            IdUser = 2,
            Email = "inactive@example.com",
            Password = BCrypt.Net.BCrypt.HashPassword("Password123"),
            IsActive = false
        };
        _authRepositoryMock.Setup(repo => repo.FindByEmail("inactive@example.com")).ReturnsAsync(inactiveUser);

        var loginRequest = new LoginRequestDto
        {
            Email = "inactive@example.com",
            Password = "Password123"
        };

        // Act & Assert
        Assert.ThrowsAsync<Exception>(async () => await _loginUseCase.Execute(loginRequest));
    }

    [Test]
    public void GenerateJwtToken_ShouldReturnValidToken()
    {
        // Act
        var token = _authService.GenerateJwtToken(user1);

        // Assert
        Assert.That(token, Is.Not.Null, "Token is generated");
        Assert.That(token.Length, Is.GreaterThan(0), "Token has content");
    }
}