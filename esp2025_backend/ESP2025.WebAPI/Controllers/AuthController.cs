using ESP2025.Application.DTOS;
using ESP2025.Application.UseCase.Auth;
using ESP2025.Domain.Entities;
using ESP2025.Domain.Interfaces.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ESP2025.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly ILoginUseCase _loginUseCase;
    private readonly IUserRepository _userRepository;

    public AuthController(ILoginUseCase loginUseCase, IUserRepository userRepository)
    {
        _loginUseCase = loginUseCase;
        _userRepository = userRepository;
    }

    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<ActionResult<AuthResponseDto>> Login([FromBody] LoginRequestDto loginRequest)
    {
        try
        {
            var response = await _loginUseCase.Execute(loginRequest);
            return Ok(response);
        }
        catch (Exception ex)
        {
            return Unauthorized(new { message = ex.Message });
        }
    }

    //DÉCOMMENTER LES LIGNES CI-DESSOUS POUR CRÉER LE PREMIER ADMIN

    [HttpPost("create-temp-admin")]
    [AllowAnonymous]
    public async Task<IActionResult> CreateTempAdmin()
    {
        try
        {
            // Créer un nouvel utilisateur admin
            var password = "Password123!";
            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(password);

            var user = new User
            {
                Email = "admin@example.com",
                Ville = "Rivière-du-Loup",
                Province = "Québec",
                Pays = "Canada",
                NoMatricule = 12345,
                Password = hashedPassword,
                FirstName = "Admin",
                LastName = "User",
                Points = 0,
                IsAdmin = true,
                IsActive = true,
                LoginAttempts = 0
            };

            // Vérifier si l'utilisateur existe déjà
            var existingUser = await _userRepository.FindByEmail("admin@example.com");

            if (existingUser != null)
            {
                return BadRequest(new { message = "Admin user already exists" });
            }

            // Créer l'utilisateur
            var createdUser = await _userRepository.Create(user);

            return Ok(new
            {
                message = "Admin user created successfully",
                userId = createdUser.IdUser,
                email = createdUser.Email,
                plainPassword = password,
                hashedPassword = hashedPassword
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = ex.Message, stackTrace = ex.StackTrace });
        }
    }
}