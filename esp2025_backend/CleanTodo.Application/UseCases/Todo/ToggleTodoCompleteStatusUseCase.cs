using ESP2025.Application.Service.Todo;
using ESP2025.Domain.Interfaces.Repositories;

namespace ESP2025.Application.UseCase;

public class ToggleTodoCompleteStatusUseCase : IToggleTodoCompleteStatusUseCase
{

    private readonly ITodoRepository _todoRepository;
    private readonly ITodoService _todoService;

    public ToggleTodoCompleteStatusUseCase(ITodoRepository todoRepository, ITodoService todoService)
    {
        _todoRepository = todoRepository;
        _todoService = todoService;
    }

    public async Task Execute(Guid id)
    {
        await _todoService.FindById(id);
        await _todoRepository.ToggleCompleteStatus(id);
    }
}