using ESP2025.Application.DTOS;

namespace ESP2025.Application.Service.Product;

public interface IProductService
{
    public Task<ProductDto> FindById(int idProduct);
    public Task<IList<ProductDto>> GetAll();
}