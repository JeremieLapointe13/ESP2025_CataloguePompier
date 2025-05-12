using ESP2025.Application.DTOS;
using ESP2025.Application.Service.User;
using ESP2025.Domain.Interfaces.Repositories;

namespace ESP2025.Application.UseCase;

public class DeleteUserUseCase : IDeleteUserUseCase
{
    private readonly IUserRepository _userRepository;
    private readonly IUserService _userService;

    public DeleteUserUseCase(IUserRepository userRepository, IUserService userService)
    {
        _userRepository = userRepository;
        _userService = userService;
    }
    
    public async Task Execute(int idUser)
    {
        await _userService.FindById(idUser);

        await _userRepository.Delete(idUser);
    }
}