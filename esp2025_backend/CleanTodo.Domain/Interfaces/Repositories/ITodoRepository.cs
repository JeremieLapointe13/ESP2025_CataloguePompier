using CleanTodo.Application.Entities;

namespace CleanTodo.Domain.Interfaces.Repositories;

public interface ITodoRepository
{
    Task<List<Todo>> GetAll();
    Task<Todo> FindById(Guid id);
    Task<Todo> Add(Todo item);
    Task ToggleCompleteStatus(Guid id);
    Task Delete(Guid id);
}
