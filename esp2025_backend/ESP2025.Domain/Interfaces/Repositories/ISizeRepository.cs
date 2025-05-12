using ESP2025.Domain.Entities;

namespace ESP2025.Domain.Interfaces.Repositories
{
    public interface ISizeRepository
    {
        Task<List<Size>> GetAll();
    }
}