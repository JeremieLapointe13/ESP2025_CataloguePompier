using ESP2025.Application.DTOS;

namespace ESP2025.Application.UseCase;
public interface IGetAllUsersUseCase
{
    Task<IList<UserDto>> Execute();
}