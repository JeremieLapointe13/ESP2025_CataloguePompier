using ESP2025.Application.DTOS;

namespace ESP2025.Application.UseCase;
public interface ICreateUserUseCase
{
    Task<UserDto> Execute(CreateUserDto createUserDto);
}
