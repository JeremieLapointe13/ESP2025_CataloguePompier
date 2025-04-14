using ESP2025.Application.DTOS;

namespace ESP2025.Application.UseCase.Auth;

public interface IRegisterUseCase
{
    Task<AuthResponseDto> Execute(RegisterRequestDto registerRequest);
}