using ESP2025.Domain.Entities;
using ESP2025.Domain.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace ESP2025.Infrastructure.Repositories;

public class CategoryRepository : ICategoryRepository
{
    private readonly AppDbContext _context;

    public CategoryRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Category>> GetAll()
    {
        return await _context.Category.ToListAsync();
    }
}
