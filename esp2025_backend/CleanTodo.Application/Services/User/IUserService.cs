using ESP2025.Application.DTOS;

namespace ESP2025.Application.Service.User;

public interface IUserService
{
    public Task<UserDto> FindById(int id);
    public Task<IList<UserDto>> GetAll();
}