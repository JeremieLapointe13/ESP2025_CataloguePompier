using ESP2025.Application.DTOS;
using ESP2025.Application.Exceptions;
using ESP2025.Application.UseCase;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class TodoController : ControllerBase
{
    private ICreateTodoUseCase _createUseCase;
    private IDeleteTodoUseCase _deleteUseCase;
    private IGetAllTodosUseCase _getAllUseCase;
    private IToggleTodoCompleteStatusUseCase _toggleCompleteStatusUseCase;

    public TodoController(ICreateTodoUseCase todoCreateUseCase, IDeleteTodoUseCase deleteUseCase, IGetAllTodosUseCase getAllUseCase, IToggleTodoCompleteStatusUseCase toggleCompleteStatusUseCase)
    {
        _createUseCase = todoCreateUseCase;
        _deleteUseCase = deleteUseCase;
        _getAllUseCase = getAllUseCase;
        _toggleCompleteStatusUseCase = toggleCompleteStatusUseCase;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TodoDto>>> GetAll()
    {
        var todos = await _getAllUseCase.Execute();
        return Ok(todos);
    }

    [HttpPost]
    public async Task<ActionResult<TodoDto>> Create([FromBody] CreateTodoDto createTodoDto)
    {
        var todo = await _createUseCase.Execute(createTodoDto);

        return CreatedAtAction(
            nameof(Create),
            new { id = todo.Id },
            todo);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id)
    {
        try
        {
            await _toggleCompleteStatusUseCase.Execute(id);
            return NoContent();
        }
        catch (NotFoundException)
        {
            return NotFound();
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        try
        {
            await _deleteUseCase.Execute(id);
            return NoContent();
        }
        catch (NotFoundException)
        {
            return NotFound();
        }
    }
}
