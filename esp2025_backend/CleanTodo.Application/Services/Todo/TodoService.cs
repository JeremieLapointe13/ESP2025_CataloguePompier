using CleanTodo.Application.DTOS;
using CleanTodo.Application.Exceptions;
using CleanTodo.Domain.Interfaces.Repositories;

namespace CleanTodo.Application.Service.Todo;


public class TodoService : ITodoService
{
    private readonly ITodoRepository _todoRepository;

    public TodoService(ITodoRepository todoRepository)
    {
        _todoRepository = todoRepository;
    }

    public async Task<TodoDto> FindById(Guid id)
    {
        var todo = await _todoRepository.FindById(id);
        if (todo == null)
        {
            throw new NotFoundException();
        }
        return new TodoDto(todo);
    }

    public async Task Delete(Guid id)
    {
        await _todoRepository.Delete(id);
    }

    public async Task<IList<TodoDto>> GetAll()
    {
        var todos = await _todoRepository.GetAll();
        return todos.Select(x => new TodoDto(x)).ToList();
    }

    public async Task ToggleCompleteStatus(Guid id)
    {
        await _todoRepository.ToggleCompleteStatus(id);
    }
}