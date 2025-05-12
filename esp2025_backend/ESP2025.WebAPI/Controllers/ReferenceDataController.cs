using ESP2025.Application.DTOS;
using ESP2025.Application.UseCases.Reference;
using ESP2025.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ESP2025.API.Controllers;

[ApiController]
[Route("api")]
[Authorize]
public class ReferenceDataController : ControllerBase
{
    private readonly IGetAllSizesUseCase _getAllSizesUseCase;
    private readonly IGetAllFabricTypesUseCase _getAllFabricTypesUseCase;
    private readonly IGetAllCategoriesUseCase _getAllCategoriesUseCase;
    private readonly IGetAllGradesUseCase _getAllGradesUseCase;

    public ReferenceDataController(
        IGetAllSizesUseCase getAllSizesUseCase,
        IGetAllFabricTypesUseCase getAllFabricTypesUseCase,
        IGetAllCategoriesUseCase getAllCategoriesUseCase,
        IGetAllGradesUseCase getAllGradesUseCase)
    {
        _getAllSizesUseCase = getAllSizesUseCase;
        _getAllFabricTypesUseCase = getAllFabricTypesUseCase;
        _getAllCategoriesUseCase = getAllCategoriesUseCase;
        _getAllGradesUseCase = getAllGradesUseCase;
    }

    [HttpGet("sizes")]
    public async Task<ActionResult<IEnumerable<Size>>> GetAllSizes()
    {
        try
        {
            var sizes = await _getAllSizesUseCase.Execute();
            return Ok(sizes);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpGet("fabrictypes")]
    public async Task<ActionResult<IEnumerable<FabricType>>> GetAllFabricTypes()
    {
        try
        {
            var fabricTypes = await _getAllFabricTypesUseCase.Execute();
            return Ok(fabricTypes);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpGet("categories")]
    public async Task<ActionResult<IEnumerable<CategoryDto>>> GetAllCategories()
    {
        try
        {
            var categories = await _getAllCategoriesUseCase.Execute();
            var flatCategories = CategoryDto.ConvertAllCategories(categories.ToList());
            return Ok(flatCategories);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpGet("grades")]
    public async Task<ActionResult<IEnumerable<Grade>>> GetAllGrades()
    {
        try
        {
            var grades = await _getAllGradesUseCase.Execute();
            return Ok(grades);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}