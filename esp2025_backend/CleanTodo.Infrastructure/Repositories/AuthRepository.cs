using ESP2025.Domain.Entities;
using ESP2025.Domain.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace ESP2025.Infrastructure.Repositories;

public class AuthRepository : IAuthRepository
{
    private readonly AppDbContext _context;

    public AuthRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<User?> FindByEmail(string email)
    {
        return await _context.User
            .Include(u => u.Grade)
            .FirstOrDefaultAsync(u => u.Email == email);
    }

    public async Task IncrementLoginAttempts(int userId)
    {
        var user = await _context.User.FindAsync(userId);
        if (user != null)
        {
            user.LoginAttempts++;
            _context.User.Update(user);
            await _context.SaveChangesAsync();
        }
    }

    public async Task ResetLoginAttempts(int userId)
    {
        var user = await _context.User.FindAsync(userId);
        if (user != null)
        {
            user.LoginAttempts = 0;
            _context.User.Update(user);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<bool> EmailExists(string email)
    {
        return await _context.User.AnyAsync(u => u.Email == email);
    }

    public async Task<User> Register(User user)
    {
        _context.User.Add(user);
        await _context.SaveChangesAsync();
        return user;
    }
}