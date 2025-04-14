using ESP2025.Application.DTOS;
using ESP2025.Application.UseCases.Product.Interfaces;
using ESP2025.Domain.Interfaces.Repositories;

public class GetAllProductsUseCase : IGetAllProductsUseCase
{
    private readonly IProductRepository _productRepository;

    public GetAllProductsUseCase(IProductRepository productRepository)
    {
        _productRepository = productRepository;
    }

    public async Task<IList<ProductDto>> Execute()
    {
        var products = await _productRepository.GetAll();
        return products.Select(x => new ProductDto(x)).ToList();
    }
}