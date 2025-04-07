using ESP2025.Application.DTOS;

namespace ESP2025.Application.Service.Todo;

public interface ITodoService
{
    public Task<TodoDto> FindById(Guid id);

}
