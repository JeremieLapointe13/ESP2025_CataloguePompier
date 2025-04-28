using ESP2025.Domain.Entities;
using ESP2025.Domain.Interfaces.Repositories;

namespace ESP2025.Application.UseCases.Reference;

public class GetAllGradesUseCase : IGetAllGradesUseCase
{
    private readonly IGradeRepository _gradeRepository;

    public GetAllGradesUseCase(IGradeRepository gradeRepository)
    {
        _gradeRepository = gradeRepository;
    }

    public async Task<List<Grade>> Execute()
    {
        return await _gradeRepository.GetAll();
    }
}