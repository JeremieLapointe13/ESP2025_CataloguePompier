
using ESP2025.Domain.Entities;

namespace ESP2025.Domain.Interfaces.Repositories
{
    public interface IProductRepository
    {
        Task<List<Product>> GetAll();
        Task<Product?> FindById(int idProduct);
        Task<Product> Create(Product product);
        Task<Product?> Update(Product product);
        Task Delete(int idProduct);
        Task<bool> ProductExists(string productNo);
    }
}
