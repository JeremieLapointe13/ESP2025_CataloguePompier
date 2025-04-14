using ESP2025.Application.DTOS;
using ESP2025.Application.Services.Auth;

namespace ESP2025.Application.UseCase.Auth;

public class RegisterUseCase : IRegisterUseCase
{
    private readonly IAuthService _authService;

    public RegisterUseCase(IAuthService authService)
    {
        _authService = authService;
    }

    public async Task<AuthResponseDto> Execute(RegisterRequestDto registerRequest)
    {
        return await _authService.Register(registerRequest);
    }
}