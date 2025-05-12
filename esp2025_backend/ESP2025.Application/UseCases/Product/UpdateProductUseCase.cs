using ESP2025.Application.DTOS;
using ESP2025.Application.Service.Product;
using ESP2025.Application.UseCases;
using ESP2025.Domain.Entities;
using ESP2025.Domain.Interfaces.Repositories;

namespace ESP2025.Application.UseCase;

public class UpdateProductUseCase : IUpdateProductUseCase
{
    private readonly IProductRepository _productRepository;
    private readonly IProductService _productService;

    public UpdateProductUseCase(IProductRepository productRepository, IProductService productService)
    {
        _productRepository = productRepository;
        _productService = productService;
    }

    public async Task<ProductDto> Execute(UpdateProductDto updateProductDto)
    {
        // verif si le produit existe
        await _productService.FindById(updateProductDto.IdProduct);

        // verif si le numero de produit existe déjà
        var existingProduct = await _productRepository.FindById(updateProductDto.IdProduct);
        if (existingProduct!.ProductNo != updateProductDto.ProductNo)
        {
            if (await _productRepository.ProductExists(updateProductDto.ProductNo))
            {
                throw new Exception("Another product with this number already exists");
            }
        }

        // met à jour le produit
        var productToUpdate = new Product
        {
            IdProduct = updateProductDto.IdProduct,
            CategoryId = updateProductDto.CategoryId,
            SupplierId = updateProductDto.SupplierId,
            SizeId = updateProductDto.SizeId,
            FabricTypeId = updateProductDto.FabricTypeId,
            ProductNo = updateProductDto.ProductNo,
            Name = updateProductDto.Name,
            Points = updateProductDto.Points,
            Description = updateProductDto.Description,
            ImageURL = updateProductDto.ImageURL,
            IsActive = updateProductDto.IsActive,
            Quantity = updateProductDto.Quantity
        };

        var updatedProduct = await _productRepository.Update(productToUpdate);
        if (updatedProduct == null)
        {
            throw new Exception("Failed to update product");
        }

        // full product pour charger les infos des tables associées
        var fullProduct = await _productRepository.FindById(updatedProduct.IdProduct);
        if (fullProduct == null)
        {
            throw new Exception("Failed to retrieve updated product");
        }

        return new ProductDto(fullProduct);
    }
}
