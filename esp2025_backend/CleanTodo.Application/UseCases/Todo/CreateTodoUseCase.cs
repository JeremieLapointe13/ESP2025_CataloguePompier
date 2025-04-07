using ESP2025.Application.DTOS;
using ESP2025.Application.Entities;
using ESP2025.Domain.Interfaces.Repositories;

namespace ESP2025.Application.UseCase;

public class CreateTodoUseCase : ICreateTodoUseCase
{
    private readonly ITodoRepository _todoRepository;

    public CreateTodoUseCase(ITodoRepository todoRepository)
    {
        _todoRepository = todoRepository;
    }

    public async Task<TodoDto> Execute(CreateTodoDto createTodoDto)
    {
        var todo = new Todo(
            createTodoDto.Title
        );

        var savedTodo = await _todoRepository.Add(todo);

        return new TodoDto(savedTodo);
    }
}