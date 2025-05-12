using ESP2025.Application.DTOS;
using ESP2025.Application.Exceptions;
using ESP2025.Domain.Interfaces.Repositories;

namespace ESP2025.Application.Service.User;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;

    public UserService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<IList<UserDto>> GetAll()
    {
        var users = await _userRepository.GetAll();
        return users.Select(x => new UserDto(x)).ToList();
    }

    public async Task<UserDto> FindById(int idUser)
    {
        var user = await _userRepository.FindById(idUser);
        if (user == null)
        {
            throw new NotFoundException();
        }
        return new UserDto(user);
    }
}