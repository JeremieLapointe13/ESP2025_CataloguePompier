using ESP2025.Application.DTOS;
using ESP2025.Application.Exceptions;
using ESP2025.Application.UseCases.Order.Interfaces;
using ESP2025.Domain.Interfaces.Repositories;
using System.Linq;
using System.Threading.Tasks;

namespace ESP2025.Application.UseCases.Order
{
    public class GetOrderByIdUseCase : IGetOrderByIdUseCase
    {
        private readonly IOrderRepository _orderRepository;

        public GetOrderByIdUseCase(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        public async Task<OrderDto> Execute(int orderId)
        {
            var order = await _orderRepository.GetOrderById(orderId);
            if (order == null)
            {
                throw new Exception("Commande non trouvée");
            }

            return new OrderDto
            {
                IdOrder = order.IdOrder,
                UserId = order.UserId,
                UserName = $"{order.User.FirstName} {order.User.LastName}",
                OrderNumber = order.OrderNumber,
                OrderDate = order.OrderDate,
                ExpectedDeliveryDate = order.ExpectedDeliveryDate,
                ActualDeliveryDate = order.ActualDeliveryDate,
                Status = order.OrderStatus.Status,
                TotalPoints = order.TotalPoints,
                OrderItems = order.OrderItems.Select(oi => new OrderItemDetailDto
                {
                    IdOrderItem = oi.IdOrderItem,
                    ProductId = oi.ProductId,
                    SizeId = oi.SizeId,
                    Quantity = oi.Quantity,
                    PointsAtPurchase = oi.PointsAtPurchase,
                    ProductName = oi.Product.Name,
                    SizeStatus = oi.Size.Status
                }).ToList()
            };
        }
    }
}