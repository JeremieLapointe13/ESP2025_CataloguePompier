using ESP2025.Application.DTOS;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ESP2025.Application.UseCases.Order.Interfaces
{
    public interface IGetOrdersByUserUseCase
    {
        Task<List<OrderDto>> Execute(int userId);
    }
}