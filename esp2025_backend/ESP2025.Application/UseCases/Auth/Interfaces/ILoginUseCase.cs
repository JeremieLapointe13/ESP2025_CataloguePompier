using ESP2025.Application.DTOS;

namespace ESP2025.Application.UseCase.Auth;

public interface ILoginUseCase
{
    Task<AuthResponseDto> Execute(LoginRequestDto loginRequest);
}