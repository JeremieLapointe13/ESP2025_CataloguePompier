using ESP2025.Application.DTOS;
using ESP2025.Domain.Interfaces.Repositories;

namespace ESP2025.Application.UseCase;

public class CreateUserUseCase : ICreateUserUseCase
{
    private readonly IUserRepository _userRepository;

    public CreateUserUseCase(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<UserDto> Execute(CreateUserDto createUserDto)
    {
        var userEntity = createUserDto.ToEntity();
        userEntity.Password = BCrypt.Net.BCrypt.HashPassword(createUserDto.Password);
        var user = await _userRepository.Create(userEntity);
        if (user == null)
        {
            throw new Exception("User could not be created");
        }
        return new UserDto(user);
    }
}