using ESP2025.Application.Service.Product;
using ESP2025.Application.UseCases;
using ESP2025.Domain.Interfaces.Repositories;

public class DeleteProductUseCase : IDeleteProductUseCase
{
    private readonly IProductRepository _productRepository;
    private readonly IProductService _productService;

    public DeleteProductUseCase(IProductRepository productRepository, IProductService productService)
    {
        _productRepository = productRepository;
        _productService = productService;
    }

    public async Task Execute(int idProduct)
    {
        // verif si le produit existe
        await _productService.FindById(idProduct);

        await _productRepository.Delete(idProduct);
    }
}