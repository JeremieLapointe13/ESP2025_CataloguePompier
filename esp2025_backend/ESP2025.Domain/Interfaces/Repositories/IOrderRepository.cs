using ESP2025.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ESP2025.Domain.Interfaces.Repositories
{
    public interface IOrderRepository
    {
        Task<List<Order>> GetOrdersByUserId(int userId);
        Task<Order?> GetOrderById(int orderId);
        Task<Order> Create(Order order);
        Task<bool> UpdateStatus(int orderId, int orderStatusId);
    }
}