using ESP2025.Domain.Entities;
using ESP2025.Domain.Interfaces.Repositories;

namespace ESP2025.Application.UseCases.Reference;

public class GetAllFabricTypesUseCase : IGetAllFabricTypesUseCase
{
    private readonly IFabricTypeRepository _fabricTypeRepository;

    public GetAllFabricTypesUseCase(IFabricTypeRepository fabricTypeRepository)
    {
        _fabricTypeRepository = fabricTypeRepository;
    }

    public async Task<List<FabricType>> Execute()
    {
        return await _fabricTypeRepository.GetAll();
    }
}