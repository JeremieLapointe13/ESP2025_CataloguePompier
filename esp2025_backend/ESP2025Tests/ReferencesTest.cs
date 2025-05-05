using ESP2025.Application.DTOS;
using ESP2025.Domain.Entities;
using ESP2025.Domain.Interfaces.Repositories;
using ESP2025.Application.UseCases.Reference;
using Moq;

namespace ESP2025.ApplicationTests;

public class ReferencesTests
{
    private Mock<ICategoryRepository> _categoryRepositoryMock;
    private Mock<IFabricTypeRepository> _fabricTypeRepositoryMock;
    private Mock<ISizeRepository> _sizeRepositoryMock;
    private Mock<IGradeRepository> _gradeRepositoryMock;

    private GetAllCategoriesUseCase _getAllCategoriesUseCase;
    private GetAllFabricTypesUseCase _getAllFabricTypesUseCase;
    private GetAllSizesUseCase _getAllSizesUseCase;
    private GetAllGradesUseCase _getAllGradesUseCase;

    // Données de test
    readonly List<Category> _testCategories = new List<Category>
    {
        new Category { IdCategory = 1, Name = "Vêtements", Level = 1, ParentId = null },
        new Category { IdCategory = 2, Name = "Accessoires", Level = 1, ParentId = null },
        new Category { IdCategory = 3, Name = "Hauts", Level = 2, ParentId = 1 }
    };

    readonly List<FabricType> _testFabricTypes = new List<FabricType>
    {
        new FabricType { IdFabricType = 1, Name = "Coton" },
        new FabricType { IdFabricType = 2, Name = "Polyester" },
        new FabricType { IdFabricType = 3, Name = "Gore-Tex" }
    };

    readonly List<Size> _testSizes = new List<Size>
    {
        new Size { IdSize = 1, Status = "XS" },
        new Size { IdSize = 2, Status = "S" },
        new Size { IdSize = 3, Status = "M" },
        new Size { IdSize = 4, Status = "L" }
    };

    readonly List<Grade> _testGrades = new List<Grade>
    {
        new Grade { IdGrade = 1, NomGrade = "Pompier" },
        new Grade { IdGrade = 2, NomGrade = "Administrateur" }
    };

    [SetUp]
    public void Setup()
    {
        _categoryRepositoryMock = new Mock<ICategoryRepository>();
        _fabricTypeRepositoryMock = new Mock<IFabricTypeRepository>();
        _sizeRepositoryMock = new Mock<ISizeRepository>();
        _gradeRepositoryMock = new Mock<IGradeRepository>();

        _getAllCategoriesUseCase = new GetAllCategoriesUseCase(_categoryRepositoryMock.Object);
        _getAllFabricTypesUseCase = new GetAllFabricTypesUseCase(_fabricTypeRepositoryMock.Object);
        _getAllSizesUseCase = new GetAllSizesUseCase(_sizeRepositoryMock.Object);
        _getAllGradesUseCase = new GetAllGradesUseCase(_gradeRepositoryMock.Object);

        // Configuration des mocks
        _categoryRepositoryMock.Setup(repo => repo.GetAll()).ReturnsAsync(_testCategories);
        _fabricTypeRepositoryMock.Setup(repo => repo.GetAll()).ReturnsAsync(_testFabricTypes);
        _sizeRepositoryMock.Setup(repo => repo.GetAll()).ReturnsAsync(_testSizes);
        _gradeRepositoryMock.Setup(repo => repo.GetAll()).ReturnsAsync(_testGrades);
    }

    [Test]
    public async Task GetAllCategories_ShouldReturnAllCategories()
    {
        // Act
        var result = await _getAllCategoriesUseCase.Execute();

        // Assert
        Assert.That(result, Is.Not.Null, "Categories list is returned");
        Assert.That(result.Count, Is.EqualTo(_testCategories.Count), "Correct number of categories returned");
        Assert.That(result[0].IdCategory, Is.EqualTo(_testCategories[0].IdCategory), "First category ID matches");
        Assert.That(result[0].Name, Is.EqualTo(_testCategories[0].Name), "First category name matches");
    }

    [Test]
    public async Task GetAllFabricTypes_ShouldReturnAllFabricTypes()
    {
        // Act
        var result = await _getAllFabricTypesUseCase.Execute();

        // Assert
        Assert.That(result, Is.Not.Null, "FabricTypes list is returned");
        Assert.That(result.Count, Is.EqualTo(_testFabricTypes.Count), "Correct number of fabric types returned");
        Assert.That(result[0].IdFabricType, Is.EqualTo(_testFabricTypes[0].IdFabricType), "First fabric type ID matches");
        Assert.That(result[0].Name, Is.EqualTo(_testFabricTypes[0].Name), "First fabric type name matches");
    }

    [Test]
    public async Task GetAllSizes_ShouldReturnAllSizes()
    {
        // Act
        var result = await _getAllSizesUseCase.Execute();

        // Assert
        Assert.That(result, Is.Not.Null, "Sizes list is returned");
        Assert.That(result.Count, Is.EqualTo(_testSizes.Count), "Correct number of sizes returned");
        Assert.That(result[0].IdSize, Is.EqualTo(_testSizes[0].IdSize), "First size ID matches");
        Assert.That(result[0].Status, Is.EqualTo(_testSizes[0].Status), "First size status matches");
    }

    [Test]
    public async Task GetAllGrades_ShouldReturnAllGrades()
    {
        // Act
        var result = await _getAllGradesUseCase.Execute();

        // Assert
        Assert.That(result, Is.Not.Null, "Grades list is returned");
        Assert.That(result.Count, Is.EqualTo(_testGrades.Count), "Correct number of grades returned");
        Assert.That(result[0].IdGrade, Is.EqualTo(_testGrades[0].IdGrade), "First grade ID matches");
        Assert.That(result[0].NomGrade, Is.EqualTo(_testGrades[0].NomGrade), "First grade name matches");
    }

    [Test]
    public async Task BuildHierarchy_ShouldCreateProperHierarchy()
    {
        // Act
        var categoriesDto = CategoryDto.BuildHierarchy(_testCategories);

        // Assert
        Assert.That(categoriesDto, Is.Not.Null, "Categories DTO list is returned");
        Assert.That(categoriesDto.Count, Is.EqualTo(2), "Correct number of root categories");

        var firstCategory = categoriesDto.FirstOrDefault(c => c.IdCategory == 1);
        Assert.That(firstCategory, Is.Not.Null, "First root category exists");
        Assert.That(firstCategory.Subcategories, Is.Not.Null, "First category has subcategories collection");
        Assert.That(firstCategory.Subcategories.Count, Is.EqualTo(1), "First category has one subcategory");
        Assert.That(firstCategory.Subcategories[0].IdCategory, Is.EqualTo(3), "Subcategory has correct ID");
    }
}