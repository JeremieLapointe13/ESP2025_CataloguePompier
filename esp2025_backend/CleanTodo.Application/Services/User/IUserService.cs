using CleanTodo.Application.DTOS;

namespace CleanTodo.Application.Service.User;

public interface IUserService
{
    public Task<UserDto> FindById(int id);
    public Task<IList<UserDto>> GetAll();
}