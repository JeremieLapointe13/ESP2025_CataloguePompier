using CleanTodo.Domain.Entities;
using CleanTodo.Domain.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace CleanTodo.Infrastructure.Repositories;

public class UserRepository : IUserRepository
{
    private readonly AppDbContext _context;

    public UserRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<User>> GetAll()
    {
        return await _context.User
            .Include(u => u.Grade)
            .ToListAsync();
    }

    public async Task<User?> FindById(int id)
    {
        return await _context.User
            .Include(u => u.Grade)
            .FirstOrDefaultAsync(x => x.IdUser == id);
    }
}