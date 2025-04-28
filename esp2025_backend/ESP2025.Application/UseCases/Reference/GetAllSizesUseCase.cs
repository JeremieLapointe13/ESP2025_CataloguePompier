using ESP2025.Domain.Entities;
using ESP2025.Domain.Interfaces.Repositories;

namespace ESP2025.Application.UseCases.Reference;

public class GetAllSizesUseCase : IGetAllSizesUseCase
{
    private readonly ISizeRepository _sizeRepository;

    public GetAllSizesUseCase(ISizeRepository sizeRepository)
    {
        _sizeRepository = sizeRepository;
    }

    public async Task<List<Size>> Execute()
    {
        return await _sizeRepository.GetAll();
    }
}
