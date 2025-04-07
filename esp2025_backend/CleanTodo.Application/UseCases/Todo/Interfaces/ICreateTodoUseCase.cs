using ESP2025.Application.DTOS;

namespace ESP2025.Application.UseCase;

public interface ICreateTodoUseCase
{
    Task<TodoDto> Execute(CreateTodoDto createTodoDto);
}