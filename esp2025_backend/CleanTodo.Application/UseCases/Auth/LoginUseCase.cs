using ESP2025.Application.DTOS;
using ESP2025.Application.Services.Auth;

namespace ESP2025.Application.UseCase.Auth;

public class LoginUseCase : ILoginUseCase
{
    private readonly IAuthService _authService;

    public LoginUseCase(IAuthService authService)
    {
        _authService = authService;
    }

    public async Task<AuthResponseDto> Execute(LoginRequestDto loginRequest)
    {
        return await _authService.Login(loginRequest);
    }
}