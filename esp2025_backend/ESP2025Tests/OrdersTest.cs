using ESP2025.Application.DTOS;
using ESP2025.Domain.Entities;
using ESP2025.Application.Exceptions;
using ESP2025.Application.Service.Product;
using ESP2025.Application.UseCases.Order;
using ESP2025.Domain.Interfaces.Repositories;
using ESP2025.Application.DTOS;
using Moq;

namespace ESP2025.ApplicationTests;

public class OrdersTests
{
    private readonly Mock<IOrderRepository> _orderRepositoryMock;
    private readonly Mock<IProductRepository> _productRepositoryMock;
    private readonly Mock<IUserRepository> _userRepositoryMock;
    private readonly Mock<IOrderItemRepository> _orderItemRepositoryMock;
    public OrdersTests()
    {
        _orderRepositoryMock = new Mock<IOrderRepository>();
        _productRepositoryMock = new Mock<IProductRepository>();
        _userRepositoryMock = new Mock<IUserRepository>();
        _orderItemRepositoryMock = new Mock<IOrderItemRepository>();
    }
}