using ESP2025.Domain.Entities;
using ESP2025.Domain.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace ESP2025.Infrastructure.Repositories;

public class GradeRepository : IGradeRepository
{
    private readonly AppDbContext _context;

    public GradeRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Grade>> GetAll()
    {
        return await _context.Grade.ToListAsync();
    }
}