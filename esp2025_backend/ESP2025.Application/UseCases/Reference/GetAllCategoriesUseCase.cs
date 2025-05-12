using ESP2025.Domain.Entities;
using ESP2025.Domain.Interfaces.Repositories;

namespace ESP2025.Application.UseCases.Reference;

public class GetAllCategoriesUseCase : IGetAllCategoriesUseCase
{
    private readonly ICategoryRepository _categoryRepository;

    public GetAllCategoriesUseCase(ICategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }

    public async Task<List<Category>> Execute()
    {
        return await _categoryRepository.GetAll();
    }
}