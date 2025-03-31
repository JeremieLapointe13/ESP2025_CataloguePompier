using CleanTodo.Application.Service.Todo;
using CleanTodo.Domain.Interfaces.Repositories;

namespace CleanTodo.Application.UseCase;

public class DeleteTodoUseCase : IDeleteTodoUseCase
{
    private readonly ITodoRepository _todoRepository;
    private readonly ITodoService _todoService;

    public DeleteTodoUseCase(ITodoRepository todoRepository, ITodoService todoService)
    {
        _todoRepository = todoRepository;
        _todoService = todoService;
    }

    public async Task Execute(Guid id)
    {
        await _todoService.FindById(id);
        await _todoRepository.Delete(id);
    }
}