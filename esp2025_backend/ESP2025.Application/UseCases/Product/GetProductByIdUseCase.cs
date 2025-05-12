using ESP2025.Application.DTOS;
using ESP2025.Application.Service.Product;
using ESP2025.Application.UseCases.Product.Interfaces;

namespace ESP2025.Application.UseCase;

public class GetProductByIdUseCase : IGetProductByIdUseCase
{
    private readonly IProductService _productService;

    public GetProductByIdUseCase(IProductService productService)
    {
        _productService = productService;
    }

    public async Task<ProductDto> Execute(int idProduct)
    {
        return await _productService.FindById(idProduct);
    }
}