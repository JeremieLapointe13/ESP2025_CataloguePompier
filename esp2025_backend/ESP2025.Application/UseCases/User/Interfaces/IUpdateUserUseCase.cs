using ESP2025.Application.DTOS;

namespace ESP2025.Application.UseCase;
public interface IUpdateUserUseCase
{
    Task<UserDto> Execute(UpdateUserDto updateUserDto);
}