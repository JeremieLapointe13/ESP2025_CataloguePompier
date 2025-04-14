using ESP2025.Domain.Entities;
using ESP2025.Domain.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace ESP2025.Infrastructure.Repositories;

public class ProductRepository : IProductRepository
{
    private readonly AppDbContext _context;

    public ProductRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Product>> GetAll()
    {
        return await _context.Product
            .Include(p => p.Category)
            .Include(p => p.Supplier)
            .Include(p => p.Size)
            .Include(p => p.FabricType)
            .ToListAsync();
    }

    public async Task<Product?> FindById(int idProduct)
    {
        return await _context.Product
            .Include(p => p.Category)
            .Include(p => p.Supplier)
            .Include(p => p.Size)
            .Include(p => p.FabricType)
            .FirstOrDefaultAsync(p => p.IdProduct == idProduct);
    }

    public async Task<Product> Create(Product product)
    {
        _context.Product.Add(product);
        await _context.SaveChangesAsync();
        return product;
    }

    public async Task<Product?> Update(Product product)
    {
        var existingProduct = await _context.Product.FindAsync(product.IdProduct);
        if (existingProduct == null)
            return null;

        _context.Entry(existingProduct).CurrentValues.SetValues(product);
        await _context.SaveChangesAsync();
        return existingProduct;
    }

    public async Task Delete(int idProduct)
    {
        var product = await _context.Product.FindAsync(idProduct);
        if (product != null)
        {
            _context.Product.Remove(product);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<bool> ProductExists(string productNo)
    {
        return await _context.Product.AnyAsync(p => p.ProductNo == productNo);
    }
}