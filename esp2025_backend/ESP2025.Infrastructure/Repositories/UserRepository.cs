using ESP2025.Domain.Entities;
using ESP2025.Domain.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace ESP2025.Infrastructure.Repositories;

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

    public async Task<User?> FindById(int idUser)
    {
        return await _context.User
            .Include(u => u.Grade)
            .FirstOrDefaultAsync(x => x.IdUser == idUser);
    }

    public async Task<User> Create(User user)
    {
        _context.User.Add(user);
        await _context.SaveChangesAsync();
        return user;
    }

    public async Task Delete(int idUser)
    {
        var user = await _context.User.FindAsync(idUser);
        if (user != null)
        {
            _context.User.Remove(user);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<User?> UpdateStatus(int idUser, bool isActive)
    {
        var user = await _context.User.FindAsync(idUser);
        if (user != null)
        {
            user.IsActive = isActive;
            _context.User.Update(user);
            await _context.SaveChangesAsync();
        }
        return user;
    }
    public async Task<User?> FindByEmail(string email)
    {
        return await _context.User
            .Include(u => u.Grade)
            .FirstOrDefaultAsync(u => u.Email == email);
    }
    public async Task<User?> Update(User user)
    {
        var existingUser = await _context.User.FindAsync(user.IdUser);
        if (existingUser == null)
            return null;

        user.Password = existingUser.Password;
        user.LoginAttempts = existingUser.LoginAttempts;

        _context.Entry(existingUser).CurrentValues.SetValues(user);
        await _context.SaveChangesAsync();
        return existingUser;
    }
}