using CleanTodo.Application.DTOS;
using CleanTodo.Domain.Interfaces.Repositories;

namespace CleanTodo.Application.UseCase;

public class GetAllUsersUseCase : IGetAllUsersUseCase
{
    private readonly IUserRepository _userRepository;

    public GetAllUsersUseCase(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<IList<UserDto>> Execute()
    {
        var users = await _userRepository.GetAll();
        return users.Select(x => new UserDto(x)).ToList();
    }
}