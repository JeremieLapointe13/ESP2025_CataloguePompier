using ESP2025.Application.DTOS;
using ESP2025.Domain.Interfaces.Repositories;

namespace ESP2025.Application.UseCase;

public class ModifyStatusUserUseCase : IModifyStatusUserUseCase
{
    private readonly IUserRepository _userRepository;

    public ModifyStatusUserUseCase(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }
    public async Task<UserDto> Execute(ModifyStatusUserDto modifyStatusUserDto)
    {
        var user = await _userRepository.UpdateStatus(
            modifyStatusUserDto.IdUser,
            modifyStatusUserDto.IsActive
        );

        if (user == null)
        {
            throw new Exception("User could not be updated");
        }
        return new UserDto(user);
    }
}