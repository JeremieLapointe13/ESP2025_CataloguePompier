using ESP2025.Application.DTOS;

namespace ESP2025.Application.UseCases;

    public interface ICreateProductUseCase
    {
        Task<ProductDto> Execute(CreateProductDto createProductDto);
    }
