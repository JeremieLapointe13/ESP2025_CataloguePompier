using ESP2025.Application.DTOS;
using ESP2025.Domain.Interfaces.Repositories;

namespace ESP2025.Application.UseCase;

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