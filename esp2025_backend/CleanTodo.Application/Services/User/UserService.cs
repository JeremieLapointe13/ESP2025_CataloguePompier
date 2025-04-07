using CleanTodo.Application.DTOS;
using CleanTodo.Application.Exceptions;
using CleanTodo.Domain.Interfaces.Repositories;

namespace CleanTodo.Application.Service.User;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;

    public UserService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<UserDto> FindById(int id)
    {
        var user = await _userRepository.FindById(id);
        if (user == null)
        {
            throw new NotFoundException();
        }
        return new UserDto(user);
    }

    public async Task<IList<UserDto>> GetAll()
    {
        var users = await _userRepository.GetAll();
        return users.Select(x => new UserDto(x)).ToList();
    }
}