using ESP2025.Application.DTOS;
using ESP2025.Application.UseCases;
using ESP2025.Domain.Interfaces.Repositories;

namespace ESP2025.Application.UseCase;

public class CreateProductUseCase : ICreateProductUseCase
{
    private readonly IProductRepository _productRepository;

    public CreateProductUseCase(IProductRepository productRepository)
    {
        _productRepository = productRepository;
    }

    public async Task<ProductDto> Execute(CreateProductDto createProductDto)
    {
        if (await _productRepository.ProductExists(createProductDto.ProductNo))
        {
            throw new Exception("Product with this number already exists");
        }

        var productEntity = createProductDto.ToEntity();
        var product = await _productRepository.Create(productEntity);

        // full product pour charger les infos des tables associées
        var fullProduct = await _productRepository.FindById(product.IdProduct);
        if (fullProduct == null)
        {
            throw new Exception("Failed to retrieve created product");
        }

        return new ProductDto(fullProduct);
    }
}