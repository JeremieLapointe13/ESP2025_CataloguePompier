using ESP2025.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ESP2025.Domain.Interfaces.Repositories
{
    public interface IOrderStatusRepository
    {
        Task<List<OrderStatus>> GetAll();
        Task<OrderStatus?> GetById(int id);
    }
}