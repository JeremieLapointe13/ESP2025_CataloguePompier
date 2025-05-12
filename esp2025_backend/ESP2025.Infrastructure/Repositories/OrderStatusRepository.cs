using ESP2025.Domain.Entities;
using ESP2025.Domain.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ESP2025.Infrastructure.Repositories;

public class OrderStatusRepository : IOrderStatusRepository
{
    private readonly AppDbContext _context;

    public OrderStatusRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<OrderStatus>> GetAll()
    {
        return await _context.OrderStatus.ToListAsync();
    }

    public async Task<OrderStatus?> GetById(int id)
    {
        return await _context.OrderStatus.FindAsync(id);
    }
}