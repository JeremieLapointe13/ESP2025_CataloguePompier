using ESP2025.Domain.Entities;
using ESP2025.Domain.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ESP2025.Infrastructure.Repositories;

public class OrderRepository : IOrderRepository
{
    private readonly AppDbContext _context;

    public OrderRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Order>> GetOrdersByUserId(int userId)
    {
        return await _context.Order
            .Include(o => o.User)
            .Include(o => o.OrderStatus)
            .Include(o => o.OrderItems) 
                .ThenInclude(oi => oi.Product)
            .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Size)
            .Where(o => o.UserId == userId)
            .OrderByDescending(o => o.OrderDate)
            .ToListAsync();
    }

    public async Task<Order?> GetOrderById(int orderId)
    {
        return await _context.Order
            .Include(o => o.User)
            .Include(o => o.OrderStatus)
            .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Product)
            .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Size)
            .FirstOrDefaultAsync(o => o.IdOrder == orderId);
    }

    public async Task<Order> Create(Order order)
    {
        _context.Order.Add(order);
        await _context.SaveChangesAsync();
        return order;
    }

    public async Task<bool> UpdateStatus(int orderId, int orderStatusId)
    {
        var order = await _context.Order.FindAsync(orderId);
        if (order == null)
        {
            return false;
        }

        order.OrderStatusId = orderStatusId;

        // Si le statut est "delivered", on met à jour la date de livraison effective
        if (orderStatusId == 3) // ID pour "delivered"
        {
            order.ActualDeliveryDate = System.DateTime.UtcNow;
        }

        await _context.SaveChangesAsync();
        return true;
    }
}