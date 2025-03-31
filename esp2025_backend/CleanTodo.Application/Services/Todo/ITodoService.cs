using CleanTodo.Application.DTOS;

namespace CleanTodo.Application.Service.Todo;

public interface ITodoService
{
    public Task<TodoDto> FindById(Guid id);

}
