using ESP2025.Domain.Entities;

namespace ESP2025.Domain.Interfaces.Repositories
{
    public interface IGradeRepository
    {
        Task<List<Grade>> GetAll();
    }
}