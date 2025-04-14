using ESP2025.Application.DTOS;

namespace ESP2025.Application.UseCases.Product.Interfaces
{
    public interface IGetProductByIdUseCase
    {
        Task<ProductDto> Execute(int idProduct);
    }
}
