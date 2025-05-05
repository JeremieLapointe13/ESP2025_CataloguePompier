using System;
using System.Collections.Generic;

namespace ESP2025.Application.DTOS;

public class OrderDto
{
    public int IdOrder { get; set; }
    public int UserId { get; set; }
    public string UserName { get; set; } = null!;
    public string OrderNumber { get; set; } = null!;
    public DateTime OrderDate { get; set; }
    public DateTime ExpectedDeliveryDate { get; set; }
    public DateTime? ActualDeliveryDate { get; set; }
    public string Status { get; set; } = null!;
    public int TotalPoints { get; set; }
    public List<OrderItemDetailDto> OrderItems { get; set; } = new List<OrderItemDetailDto>();
}