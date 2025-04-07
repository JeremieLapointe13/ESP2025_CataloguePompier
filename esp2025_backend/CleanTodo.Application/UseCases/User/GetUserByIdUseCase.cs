using ESP2025.Application.DTOS;
using ESP2025.Domain.Interfaces.Repositories;

namespace ESP2025.Application.UseCase;

public class GetUserByIdUseCase : IGetUserByIdUseCase
{
    private readonly IUserRepository _userRepository;

    public GetUserByIdUseCase(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<UserDto?> Execute(int idUser)
    {
        var user = await _userRepository.FindById(idUser);
        if (user == null)
            return null;
        return new UserDto(user);
    }
}