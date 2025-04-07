using CleanTodo.Application.DTOS;

namespace CleanTodo.Application.UseCase;
public interface IGetAllUsersUseCase
{
    Task<IList<UserDto>> Execute();
}