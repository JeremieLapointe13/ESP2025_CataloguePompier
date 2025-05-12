using ESP2025.Domain.Entities;
using ESP2025.Domain.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace ESP2025.Infrastructure.Repositories;

public class FabricTypeRepository : IFabricTypeRepository
{
    private readonly AppDbContext _context;

    public FabricTypeRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<FabricType>> GetAll()
    {
        return await _context.FabricType.ToListAsync();
    }
}