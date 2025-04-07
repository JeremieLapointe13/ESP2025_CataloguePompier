using ESP2025.Application.Entities;

namespace ESP2025.Domain.Interfaces.Repositories;

public interface ITodoRepository
{
    Task<List<Todo>> GetAll();
    Task<Todo> FindById(Guid id);
    Task<Todo> Add(Todo item);
    Task ToggleCompleteStatus(Guid id);
    Task Delete(Guid id);
}
