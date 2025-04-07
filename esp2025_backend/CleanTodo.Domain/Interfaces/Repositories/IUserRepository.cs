using CleanTodo.Domain.Entities;

namespace CleanTodo.Domain.Interfaces.Repositories;

public interface IUserRepository
{
    Task<List<User>> GetAll();
    Task<User?> FindById(int id);
}