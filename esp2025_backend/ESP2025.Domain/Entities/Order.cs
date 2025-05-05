using System;
using System.Collections.Generic;

namespace ESP2025.Domain.Entities;

public class Order
{
    public int IdOrder { get; set; }
    public int UserId { get; set; }
    public int OrderStatusId { get; set; }
    public string OrderNumber { get; set; } = null!;
    public DateTime OrderDate { get; set; }
    public DateTime ExpectedDeliveryDate { get; set; }
    public DateTime? ActualDeliveryDate { get; set; }
    public int TotalPoints { get; set; }

    // Navigation properties
    public virtual User User { get; set; } = null!;
    public virtual OrderStatus OrderStatus { get; set; } = null!;
    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
}