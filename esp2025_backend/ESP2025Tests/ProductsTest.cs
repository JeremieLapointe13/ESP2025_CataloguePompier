using ESP2025.Application.DTOS;
using ESP2025.Domain.Entities;
using ESP2025.Application.Exceptions;
using ESP2025.Application.Service.Product;
using ESP2025.Application.UseCase;
using ESP2025.Domain.Interfaces.Repositories;
using Moq;

namespace ESP2025.ApplicationTests;

public class ProductsTests
{
    private Mock<IProductRepository> _productRepositoryMock;
    private CreateProductUseCase _createProductUseCase;
    private DeleteProductUseCase _deleteProductUseCase;
    private GetAllProductsUseCase _getAllProductsUseCase;
    private UpdateProductUseCase _updateProductUseCase;
    private GetProductByIdUseCase _getProductByIdUseCase;

    Product product1 = new Product
    {
        IdProduct = 1,
        Name = "T-shirt",
        ProductNo = "P001",
        CategoryId = 1,
        SupplierId = 1,
        SizeId = 1,
        Quantity = 10
    };

    Product product2 = new Product
    {
        IdProduct = 2,
        Name = "Casquette",
        ProductNo = "P002",
        CategoryId = 1,
        SupplierId = 1,
        SizeId = 2,
        Quantity = 15
    };

    [SetUp]
    public void Setup()
    {
        _productRepositoryMock = new Mock<IProductRepository>();
        var productService = new ProductService(_productRepositoryMock.Object);
        _createProductUseCase = new CreateProductUseCase(_productRepositoryMock.Object);
        _deleteProductUseCase = new DeleteProductUseCase(_productRepositoryMock.Object, productService);
        _getAllProductsUseCase = new GetAllProductsUseCase(_productRepositoryMock.Object);
        _updateProductUseCase = new UpdateProductUseCase(_productRepositoryMock.Object, productService);
        _getProductByIdUseCase = new GetProductByIdUseCase(productService);

        // Arrange
        _productRepositoryMock.Setup(repo => repo.Create(It.IsAny<Product>())).ReturnsAsync(product1);
        _productRepositoryMock.Setup(repo => repo.Delete(It.IsAny<int>()));
        _productRepositoryMock.Setup(repo => repo.Update(It.IsAny<Product>())).ReturnsAsync(product1);
        _productRepositoryMock.Setup(repo => repo.GetAll()).ReturnsAsync(new List<Product> { product1, product2 });
        _productRepositoryMock.Setup(repo => repo.FindById(It.Is<int>(id => id == product1.IdProduct))).ReturnsAsync(product1);
        _productRepositoryMock.Setup(repo => repo.ProductExists(It.Is<string>(no => no != product1.ProductNo))).ReturnsAsync(false);
    }

    [Test]
    public async Task CreateProduct_ShouldReturnCreatedProduct()
    {
        // Arrange
        var createProductDto = new CreateProductDto
        {
            Name = "T-shirt",
            ProductNo = "P003",
            CategoryId = 1,
            SupplierId = 1,
            SizeId = 1,
            Quantity = 10
        };

        // Act
        var result = await _createProductUseCase.Execute(createProductDto);

        // Assert
        Assert.That(product1.IdProduct == result.IdProduct, "Product is returned");
        Assert.That(product1.Name == result.Name, "Same name");
    }

    [Test]
    public async Task DeleteProduct_ShouldCallRepositoryDelete()
    {
        // Act
        await _deleteProductUseCase.Execute(product1.IdProduct);

        // Assert
        _productRepositoryMock.Verify(repo => repo.Delete(product1.IdProduct), Times.Once);
    }

    [Test]
    public async Task GetAllProducts_ShouldReturnAllProducts()
    {
        // Act
        var result = await _getAllProductsUseCase.Execute();

        // Assert
        Assert.That(result.Count == 2, "Got 2 products");
        Assert.That(product1.IdProduct == result[0].IdProduct, "Both products are returned");
        Assert.That(product2.IdProduct == result[1].IdProduct, "Both products are returned");
    }

    [Test]
    public async Task UpdateProduct_ShouldCallRepositoryUpdate()
    {
        // Arrange
        var updateProductDto = new UpdateProductDto
        {
            IdProduct = 1,
            Name = "T-shirt updated",
            ProductNo = "P001",
            CategoryId = 1,
            SupplierId = 1,
            SizeId = 1,
            Quantity = 20
        };

        // Act
        await _updateProductUseCase.Execute(updateProductDto);

        // Assert
        _productRepositoryMock.Verify(repo => repo.Update(It.IsAny<Product>()), Times.Once);
    }

    [Test]
    public async Task GetProductById_ShouldReturnProduct()
    {
        // Act
        var result = await _getProductByIdUseCase.Execute(product1.IdProduct);

        // Assert
        Assert.That(result.IdProduct == product1.IdProduct, "Product with correct ID is returned");
        Assert.That(result.Name == product1.Name, "Product has correct name");
    }

    [Test]
    public async Task DeletingMissingProduct_ShouldThrowAnError()
    {
        int idOfFakeProduct = 999;

        // Act & Assert
        Assert.ThrowsAsync<NotFoundException>(async () => await _deleteProductUseCase.Execute(idOfFakeProduct));
    }

    [Test]
    public async Task CreateProductWithExistingNumber_ShouldThrowAnError()
    {
        // Arrange
        _productRepositoryMock.Setup(repo => repo.ProductExists("P001")).ReturnsAsync(true);
        var createProductDto = new CreateProductDto
        {
            Name = "T-shirt duplicate",
            ProductNo = "P001",
            CategoryId = 1,
            SupplierId = 1,
            SizeId = 1,
            Quantity = 5
        };

        // Act & Assert
        Assert.ThrowsAsync<Exception>(async () => await _createProductUseCase.Execute(createProductDto));
    }
}