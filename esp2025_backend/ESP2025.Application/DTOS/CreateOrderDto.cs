using System.Collections.Generic;

namespace ESP2025.Application.DTOS;

public class CreateOrderDto
{
    public List<OrderItemDto> OrderItems { get; set; } = new List<OrderItemDto>();
}