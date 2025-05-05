using ESP2025.Domain.Entities;
using System.Threading.Tasks;

namespace ESP2025.Domain.Interfaces.Repositories
{
    public interface IOrderItemRepository
    {
        Task<OrderItem> Create(OrderItem orderItem);
    }
}