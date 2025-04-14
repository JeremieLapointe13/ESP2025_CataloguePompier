using ESP2025.Application.DTOS;

namespace ESP2025.Application.UseCases.Product.Interfaces
{
    public interface IGetAllProductsUseCase
    {
        Task<IList<ProductDto>> Execute();
    }
}
