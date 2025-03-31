using CleanTodo.Application.DTOS;

namespace CleanTodo.Application.UseCase;
public interface IGetAllTodosUseCase
{
    Task<IList<TodoDto>> Execute();
}