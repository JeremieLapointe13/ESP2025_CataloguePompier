using CleanTodo.Application.DTOS;

namespace CleanTodo.Application.UseCase;

public interface ICreateTodoUseCase
{
    Task<TodoDto> Execute(CreateTodoDto createTodoDto);
}