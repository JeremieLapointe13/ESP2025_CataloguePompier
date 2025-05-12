using ESP2025.Domain.Entities;
using ESP2025.Domain.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace ESP2025.Infrastructure.Repositories;

public class SizeRepository : ISizeRepository
{
    private readonly AppDbContext _context;

    public SizeRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Size>> GetAll()
    {
        return await _context.Size.ToListAsync();
    }
}