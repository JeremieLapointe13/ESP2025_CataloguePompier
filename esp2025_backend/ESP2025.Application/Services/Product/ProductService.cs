using ESP2025.Application.DTOS;
using ESP2025.Application.Exceptions;
using ESP2025.Domain.Interfaces.Repositories;

namespace ESP2025.Application.Service.Product;

public class ProductService : IProductService
{
    private readonly IProductRepository _productRepository;

    public ProductService(IProductRepository productRepository)
    {
        _productRepository = productRepository;
    }

    public async Task<ProductDto> FindById(int idProduct)
    {
        var product = await _productRepository.FindById(idProduct);
        if (product == null)
        {
            throw new NotFoundException();
        }
        return new ProductDto(product);
    }

    public async Task<IList<ProductDto>> GetAll()
    {
        var products = await _productRepository.GetAll();
        return products.Select(x => new ProductDto(x)).ToList();
    }
}