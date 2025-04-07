using ESP2025.Application.DTOS;

namespace ESP2025.Application.UseCase;
public interface IGetUserByIdUseCase
{
    Task<UserDto?> Execute(int id);
}