using ESP2025.Application.DTOS;
using ESP2025.Application.UseCases.Order.Interfaces;
using ESP2025.Domain.Interfaces.Repositories;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ESP2025.Application.UseCases.Order
{
    public class GetOrdersByUserUseCase : IGetOrdersByUserUseCase
    {
        private readonly IOrderRepository _orderRepository;

        public GetOrdersByUserUseCase(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }
        public async Task<List<OrderDto>> Execute(int userId)
        {
            var orders = await _orderRepository.GetOrdersByUserId(userId);

            return orders.Select(o => new OrderDto
            {
                IdOrder = o.IdOrder,
                UserId = o.UserId,
                UserName = $"{o.User.FirstName} {o.User.LastName}",
                OrderNumber = o.OrderNumber,
                OrderDate = o.OrderDate,
                ExpectedDeliveryDate = o.ExpectedDeliveryDate,
                ActualDeliveryDate = o.ActualDeliveryDate,
                Status = o.OrderStatus.Status,
                TotalPoints = o.TotalPoints,
                OrderItems = o.OrderItems.Select(oi => new OrderItemDetailDto 
                {
                    IdOrderItem = oi.IdOrderItem,
                    ProductId = oi.ProductId,
                    SizeId = oi.SizeId,
                    Quantity = oi.Quantity,
                    PointsAtPurchase = oi.PointsAtPurchase,
                    ProductName = oi.Product.Name,
                    SizeStatus = oi.Size.Status
                }).ToList()
            }).ToList();
        }
    }
}