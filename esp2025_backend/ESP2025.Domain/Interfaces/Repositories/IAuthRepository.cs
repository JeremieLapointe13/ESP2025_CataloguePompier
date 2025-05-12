using ESP2025.Domain.Entities;

namespace ESP2025.Domain.Interfaces.Repositories;

public interface IAuthRepository
{
    Task<User?> FindByEmail(string email);
    Task IncrementLoginAttempts(int userId);
    Task ResetLoginAttempts(int userId);
}
