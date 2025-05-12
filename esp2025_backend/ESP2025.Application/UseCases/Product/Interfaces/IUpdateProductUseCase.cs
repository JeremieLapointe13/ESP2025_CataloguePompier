using ESP2025.Application.DTOS;

namespace ESP2025.Application.UseCases
{
    public interface IUpdateProductUseCase
    {
        Task<ProductDto> Execute(UpdateProductDto updateProductDto);
    }
}
