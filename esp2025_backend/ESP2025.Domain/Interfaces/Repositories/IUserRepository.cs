using ESP2025.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ESP2025.Domain.Interfaces.Repositories;

public interface IUserRepository
{
    Task<List<User>> GetAll();
    Task<User?> FindById(int idUser);
    Task<User> Create(User user);
    Task Delete(int idUser);
    Task<User?> UpdateStatus(int idUser, bool isActive);
    Task<User?> FindByEmail(string email);
}