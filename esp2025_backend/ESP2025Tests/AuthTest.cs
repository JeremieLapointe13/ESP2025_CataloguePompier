using ESP2025.Application.DTOS;
using ESP2025.Domain.Entities;
using ESP2025.Application.Exceptions;
using ESP2025.Application.UseCases.Order;
using ESP2025.Application.UseCases.Order.Interfaces;
using ESP2025.Domain.Interfaces.Repositories;
using Moq;

namespace ESP2025.ApplicationTests;

public class OrdersTests
{
    private Mock<IOrderRepository> _orderRepositoryMock;
    private Mock<IProductRepository> _productRepositoryMock;
    private Mock<IUserRepository> _userRepositoryMock;
    private Mock<IOrderItemRepository> _orderItemRepositoryMock;

    private CreateOrderUseCase _createOrderUseCase;
    private GetOrdersByUserUseCase _getOrdersByUserUseCase;
    private GetOrderByIdUseCase _getOrderByIdUseCase;

    private User testUser;
    private Product testProduct;
    private Order testOrder;
    private OrderItem testOrderItem;
    private OrderStatus testOrderStatus;

    [SetUp]
    public void Setup()
    {
        _orderRepositoryMock = new Mock<IOrderRepository>();
        _productRepositoryMock = new Mock<IProductRepository>();
        _userRepositoryMock = new Mock<IUserRepository>();
        _orderItemRepositoryMock = new Mock<IOrderItemRepository>();

        // Créer les use cases avec les mocks
        _createOrderUseCase = new CreateOrderUseCase(
            _orderRepositoryMock.Object,
            _productRepositoryMock.Object,
            _userRepositoryMock.Object,
            _orderItemRepositoryMock.Object);

        _getOrdersByUserUseCase = new GetOrdersByUserUseCase(
            _orderRepositoryMock.Object);

        _getOrderByIdUseCase = new GetOrderByIdUseCase(
            _orderRepositoryMock.Object);

        // Configurer les données de test
        SetupTestData();

        // Configurer les mocks
        SetupMocks();
    }

    private void SetupTestData()
    {
        // Configurer un utilisateur de test
        testUser = new User
        {
            IdUser = 1,
            FirstName = "Jérémie",
            LastName = "Lapointe",
            Email = "test@example.com",
            Ville = "Rivière-du-Loup",
            Province = "Québec",
            Pays = "Canada",
            NoMatricule = 1001,
            Points = 500, // Beaucoup de points pour les tests
            IsAdmin = false,
            IsActive = true,
            LoginAttempts = 0
        };

        // Configurer un produit de test
        testProduct = new Product
        {
            IdProduct = 1,
            Name = "T-shirt",
            ProductNo = "P001",
            CategoryId = 1,
            SupplierId = 1,
            SizeId = 1,
            Points = 25,
            Quantity = 10,
            IsActive = true
        };

        // Configurer un statut de commande
        testOrderStatus = new OrderStatus
        {
            IdOrderStatus = 1,
            Status = "pending"
        };

        // Configurer une commande de test
        testOrder = new Order
        {
            IdOrder = 1,
            UserId = testUser.IdUser,
            OrderStatusId = testOrderStatus.IdOrderStatus,
            OrderNumber = "123456-654321",
            OrderDate = DateTime.UtcNow,
            ExpectedDeliveryDate = DateTime.UtcNow.AddDays(2),
            ActualDeliveryDate = null,
            TotalPoints = 25,
            User = testUser,
            OrderStatus = testOrderStatus,
            OrderItems = new List<OrderItem>()
        };

        // Configurer un item de commande de test
        testOrderItem = new OrderItem
        {
            IdOrderItem = 1,
            OrderId = testOrder.IdOrder,
            ProductId = testProduct.IdProduct,
            SizeId = testProduct.SizeId,
            Quantity = 1,
            PointsAtPurchase = testProduct.Points,
            Product = testProduct,
            Size = new Size { IdSize = 1, Status = "M" }
        };

        // Ajouter l'item à la commande
        testOrder.OrderItems.Add(testOrderItem);
    }

    private void SetupMocks()
    {
        // Mock du repository User
        _userRepositoryMock.Setup(repo => repo.FindById(testUser.IdUser))
            .ReturnsAsync(testUser);

        // Mock du repository Product
        _productRepositoryMock.Setup(repo => repo.FindById(testProduct.IdProduct))
            .ReturnsAsync(testProduct);

        // Mock du repository Order
        _orderRepositoryMock.Setup(repo => repo.Create(It.IsAny<Order>()))
            .ReturnsAsync((Order order) => {
                order.IdOrder = 1;
                return order;
            });

        _orderRepositoryMock.Setup(repo => repo.GetOrdersByUserId(testUser.IdUser))
            .ReturnsAsync(new List<Order> { testOrder });

        _orderRepositoryMock.Setup(repo => repo.GetOrderById(testOrder.IdOrder))
            .ReturnsAsync(testOrder);

        // Mock du repository OrderItem
        _orderItemRepositoryMock.Setup(repo => repo.Create(It.IsAny<OrderItem>()))
            .ReturnsAsync((OrderItem item) => {
                item.IdOrderItem = 1;
                return item;
            });
    }

    [Test]
    public async Task CreateOrder_ShouldCreateOrderAndDeductPoints()
    {
        // Arrange
        var createOrderDto = new CreateOrderDto
        {
            OrderItems = new List<OrderItemDto>
        {
            new OrderItemDto
            {
                ProductId = testProduct.IdProduct,
                SizeId = testProduct.SizeId,
                Quantity = 1
            }
        }
        };

        int initialPoints = testUser.Points;
        int expectedDeduction = testProduct.Points;

        // Act
        var result = await _createOrderUseCase.Execute(testUser.IdUser, createOrderDto);

        // Assert
        Assert.That(result, Is.Not.Null);
        Assert.That(result.OrderNumber, Is.Not.Null.Or.Empty);
        Assert.That(result.TotalPoints, Is.EqualTo(testProduct.Points));
        Assert.That(result.Status, Is.EqualTo("pending"));

        _orderRepositoryMock.Verify(repo => repo.Create(It.IsAny<Order>()), Times.Once);
        _orderItemRepositoryMock.Verify(repo => repo.Create(It.IsAny<OrderItem>()), Times.Once);

        _userRepositoryMock.Verify(repo => repo.Update(It.IsAny<User>()), Times.Once);
    }

    [Test]
    public async Task CreateOrder_WithInsufficientPoints_ShouldThrowException()
    {
        // Arrange
        var userWithLowPoints = new User
        {
            IdUser = 2,
            FirstName = "User",
            LastName = "Test",
            Points = 10 // Moins que le coût du produit
        };

        _userRepositoryMock.Setup(repo => repo.FindById(userWithLowPoints.IdUser))
            .ReturnsAsync(userWithLowPoints);

        var createOrderDto = new CreateOrderDto
        {
            OrderItems = new List<OrderItemDto>
            {
                new OrderItemDto
                {
                    ProductId = testProduct.IdProduct,
                    SizeId = testProduct.SizeId,
                    Quantity = 1
                }
            }
        };

        // Act & Assert
        Assert.ThrowsAsync<Exception>(async () =>
            await _createOrderUseCase.Execute(userWithLowPoints.IdUser, createOrderDto));
    }

    [Test]
    public async Task CreateOrder_WithNonExistentProduct_ShouldThrowException()
    {
        // Arrange
        _productRepositoryMock.Setup(repo => repo.FindById(999))
            .ReturnsAsync((Product)null);

        var createOrderDto = new CreateOrderDto
        {
            OrderItems = new List<OrderItemDto>
            {
                new OrderItemDto
                {
                    ProductId = 999, // ID de produit qui n'existe pas
                    SizeId = 1,
                    Quantity = 1
                }
            }
        };

        // Act & Assert
        Assert.ThrowsAsync<Exception>(async () =>
            await _createOrderUseCase.Execute(testUser.IdUser, createOrderDto));
    }

    [Test]
    public async Task CreateOrder_WithInactiveProduct_ShouldThrowException()
    {
        // Arrange
        var inactiveProduct = new Product
        {
            IdProduct = 2,
            Name = "Produit inactif",
            ProductNo = "P002",
            IsActive = false,
            Quantity = 10
        };

        _productRepositoryMock.Setup(repo => repo.FindById(inactiveProduct.IdProduct))
            .ReturnsAsync(inactiveProduct);

        var createOrderDto = new CreateOrderDto
        {
            OrderItems = new List<OrderItemDto>
            {
                new OrderItemDto
                {
                    ProductId = inactiveProduct.IdProduct,
                    SizeId = 1,
                    Quantity = 1
                }
            }
        };

        // Act & Assert
        Assert.ThrowsAsync<Exception>(async () =>
            await _createOrderUseCase.Execute(testUser.IdUser, createOrderDto));
    }

    [Test]
    public async Task CreateOrder_WithInsufficientQuantity_ShouldThrowException()
    {
        // Arrange
        var lowQuantityProduct = new Product
        {
            IdProduct = 3,
            Name = "Produit faible stock",
            ProductNo = "P003",
            IsActive = true,
            Quantity = 2, // Quantité insuffisante
            Points = 25
        };

        _productRepositoryMock.Setup(repo => repo.FindById(lowQuantityProduct.IdProduct))
            .ReturnsAsync(lowQuantityProduct);

        var createOrderDto = new CreateOrderDto
        {
            OrderItems = new List<OrderItemDto>
            {
                new OrderItemDto
                {
                    ProductId = lowQuantityProduct.IdProduct,
                    SizeId = 1,
                    Quantity = 5 // Plus que la quantité disponible
                }
            }
        };

        // Act & Assert
        Assert.ThrowsAsync<Exception>(async () =>
            await _createOrderUseCase.Execute(testUser.IdUser, createOrderDto));
    }

    [Test]
    public async Task GetOrdersByUser_ShouldReturnUserOrders()
    {
        // Act
        var result = await _getOrdersByUserUseCase.Execute(testUser.IdUser);

        // Assert
        Assert.That(result, Is.Not.Null);
        Assert.That(result.Count, Is.EqualTo(1));
        Assert.That(result[0].IdOrder, Is.EqualTo(testOrder.IdOrder));
        Assert.That(result[0].OrderNumber, Is.EqualTo(testOrder.OrderNumber));
    }

    [Test]
    public async Task GetOrderById_ShouldReturnOrder()
    {
        // Act
        var result = await _getOrderByIdUseCase.Execute(testOrder.IdOrder);

        // Assert
        Assert.That(result, Is.Not.Null);
        Assert.That(result.IdOrder, Is.EqualTo(testOrder.IdOrder));
        Assert.That(result.OrderNumber, Is.EqualTo(testOrder.OrderNumber));
        Assert.That(result.OrderItems.Count, Is.EqualTo(1));
        Assert.That(result.OrderItems[0].ProductId, Is.EqualTo(testProduct.IdProduct));
    }

    [Test]
    public async Task GetOrderById_WithNonExistentId_ShouldThrowException()
    {
        // Arrange
        _orderRepositoryMock.Setup(repo => repo.GetOrderById(999))
            .ReturnsAsync((Order)null);

        // Act & Assert
        Assert.ThrowsAsync<Exception>(async () =>
            await _getOrderByIdUseCase.Execute(999));
    }
}