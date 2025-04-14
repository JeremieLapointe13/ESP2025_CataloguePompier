using ESP2025.Application.DTOS;
using ESP2025.Domain.Entities;

namespace ESP2025.Application.Services.Auth;

public interface IAuthService
{
    Task<AuthResponseDto> Login(LoginRequestDto loginRequest);
    string GenerateJwtToken(User user);
}