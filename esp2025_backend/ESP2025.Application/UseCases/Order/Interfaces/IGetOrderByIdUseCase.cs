using ESP2025.Application.DTOS;
using System.Threading.Tasks;

namespace ESP2025.Application.UseCases.Order.Interfaces
{
    public interface IGetOrderByIdUseCase
    {
        Task<OrderDto> Execute(int orderId);
    }
}