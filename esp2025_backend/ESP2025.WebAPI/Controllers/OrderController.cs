using ESP2025.Application.DTOS;
using ESP2025.Application.Exceptions;
using ESP2025.Application.UseCases.Order.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace ESP2025.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly ICreateOrderUseCase _createOrderUseCase;
    private readonly IGetOrdersByUserUseCase _getOrdersByUserUseCase;
    private readonly IGetOrderByIdUseCase _getOrderByIdUseCase;

    public OrdersController(
        ICreateOrderUseCase createOrderUseCase,
        IGetOrdersByUserUseCase getOrdersByUserUseCase,
        IGetOrderByIdUseCase getOrderByIdUseCase)
    {
        _createOrderUseCase = createOrderUseCase;
        _getOrdersByUserUseCase = getOrdersByUserUseCase;
        _getOrderByIdUseCase = getOrderByIdUseCase;
    }

    [HttpPost]
    [Authorize(Roles = "Admin, User")]
    public async Task<ActionResult<OrderDto>> CreateOrder([FromBody] CreateOrderDto createOrderDto)
    {
        try
        {
            var userId = GetUserIdFromToken();
            var order = await _createOrderUseCase.Execute(userId, createOrderDto);
            return CreatedAtAction(nameof(GetById), new { id = order.IdOrder }, order);
        }
        catch (NotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpGet]
    [Authorize(Roles = "Admin, User")]
    public async Task<ActionResult<IEnumerable<OrderDto>>> GetByUser()
    {
        try
        {
            var userId = GetUserIdFromToken();
            var orders = await _getOrdersByUserUseCase.Execute(userId);
            return Ok(orders);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpGet("{id}")]
    [Authorize(Roles = "Admin, User")]
    public async Task<ActionResult<OrderDto>> GetById(int id)
    {
        try
        {
            var order = await _getOrderByIdUseCase.Execute(id);

            // Vérifier si l'utilisateur est autorisé à voir cette commande
            var userId = GetUserIdFromToken();
            if (order.UserId != userId && !User.IsInRole("Admin"))
            {
                return Forbid();
            }

            return Ok(order);
        }
        catch (NotFoundException)
        {
            return NotFound();
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    private int GetUserIdFromToken()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
        {
            throw new UnauthorizedAccessException("Invalid token");
        }
        return userId;
    }
}