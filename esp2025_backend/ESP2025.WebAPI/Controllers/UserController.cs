using ESP2025.Application.DTOS;
using ESP2025.Application.Exceptions;
using ESP2025.Application.UseCase;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace ESP2025.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly IGetAllUsersUseCase _getAllUsersUseCase;
    private readonly IGetUserByIdUseCase _getUserByIdUseCase;
    private readonly ICreateUserUseCase _createUserUseCase;
    private readonly IDeleteUserUseCase _deleteUserUseCase;
    private readonly IModifyStatusUserUseCase _modifyStatusUserUseCase;

    public UsersController(IGetAllUsersUseCase getAllUsersUseCase, IGetUserByIdUseCase getUserByIdUseCase, ICreateUserUseCase createUserUseCase, IDeleteUserUseCase deleteUserUseCase, IModifyStatusUserUseCase modifyStatusUserUseCase)
    {
        _getAllUsersUseCase = getAllUsersUseCase;
        _getUserByIdUseCase = getUserByIdUseCase;
        _createUserUseCase = createUserUseCase;
        _deleteUserUseCase = deleteUserUseCase;
        _modifyStatusUserUseCase = modifyStatusUserUseCase;
    }


    [HttpGet]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<IEnumerable<UserDto>>> GetAll()
    {
        var users = await _getAllUsersUseCase.Execute();
        return Ok(users);
    }

    [HttpGet("{idUser}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<UserDto>> GetById(int idUser)
    {
        var user = await _getUserByIdUseCase.Execute(idUser);
        return Ok(user);
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<UserDto>> CreateUser(CreateUserDto createUserDto)
    {
        var user = await _createUserUseCase.Execute(createUserDto);
        return Ok(user);
    }

    [HttpDelete("{idUser}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> DeleteUser(int idUser)
    {
        try
        {
            await _deleteUserUseCase.Execute(idUser);
            return NoContent();
        }
        catch (NotFoundException)
        {
            return NotFound();
        }
    }

    [HttpPatch("{idUser}/status")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<UserDto>> ModifyStatus(ModifyStatusUserDto modifyStatusUserDto)
    {
        try
        {
            var user = await _modifyStatusUserUseCase.Execute(modifyStatusUserDto);
            return Ok(user);
        }
        catch (NotFoundException)
        {
            return NotFound();
        }
    }
}