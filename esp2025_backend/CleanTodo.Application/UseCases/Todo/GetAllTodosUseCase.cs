using ESP2025.Application.DTOS;
using ESP2025.Domain.Interfaces.Repositories;

namespace ESP2025.Application.UseCase;

public class GetAllTodosUseCase : IGetAllTodosUseCase
{
    private readonly ITodoRepository _todoRepository;

    public GetAllTodosUseCase(ITodoRepository todoRepository)
    {
        _todoRepository = todoRepository;
    }

    public async Task<IList<TodoDto>> Execute()
    {
        var todos = await _todoRepository.GetAll();
        return todos.Select(x => new TodoDto(x)).ToList();
    }
}