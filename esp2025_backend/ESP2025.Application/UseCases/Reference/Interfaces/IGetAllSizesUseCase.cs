using ESP2025.Domain.Entities;

namespace ESP2025.Application.UseCases.Reference;

public interface IGetAllSizesUseCase
{
    Task<List<Size>> Execute();
}