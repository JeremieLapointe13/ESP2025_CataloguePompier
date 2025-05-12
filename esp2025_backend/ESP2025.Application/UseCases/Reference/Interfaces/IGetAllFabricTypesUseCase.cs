using ESP2025.Domain.Entities;

namespace ESP2025.Application.UseCases.Reference;

public interface IGetAllFabricTypesUseCase
{
    Task<List<FabricType>> Execute();
}