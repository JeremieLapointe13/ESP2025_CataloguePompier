using CleanTodo.Application.DTOS;
using CleanTodo.Application.Exceptions;
using CleanTodo.Application.UseCase;
using Microsoft.AspNetCore.Mvc;

namespace CleanTodo.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly IGetAllUsersUseCase _getAllUsersUseCase;

    public UsersController(IGetAllUsersUseCase getAllUsersUseCase)
    {
        _getAllUsersUseCase = getAllUsersUseCase;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserDto>>> GetAll()
    {
        var users = await _getAllUsersUseCase.Execute();
        return Ok(users);
    }
}