using ESP2025.Application.DTOS;
using ESP2025.Application.Service.User;
using ESP2025.Domain.Entities;
using ESP2025.Domain.Interfaces.Repositories;

namespace ESP2025.Application.UseCase;

public class UpdateUserUseCase : IUpdateUserUseCase
{
    private readonly IUserRepository _userRepository;
    private readonly IUserService _userService;

    public UpdateUserUseCase(IUserRepository userRepository, IUserService userService)
    {
        _userRepository = userRepository;
        _userService = userService;
    }

    public async Task<UserDto> Execute(UpdateUserDto updateUserDto)
    {
        // Vérifier si l'utilisateur existe
        await _userService.FindById(updateUserDto.IdUser);

        // Mettre à jour l'utilisateur
        var userToUpdate = new User
        {
            IdUser = updateUserDto.IdUser,
            GradeId = updateUserDto.GradeId,
            Email = updateUserDto.Email,
            Ville = updateUserDto.Ville,
            Province = updateUserDto.Province,
            Pays = updateUserDto.Pays,
            NoMatricule = updateUserDto.NoMatricule,
            FirstName = updateUserDto.FirstName,
            LastName = updateUserDto.LastName,
            Points = updateUserDto.Points,
            IsAdmin = updateUserDto.IsAdmin,
            IsActive = updateUserDto.IsActive ?? true
        };

        var updatedUser = await _userRepository.Update(userToUpdate);
        if (updatedUser == null)
        {
            throw new Exception("Failed to update user");
        }

        return new UserDto(updatedUser);
    }
}