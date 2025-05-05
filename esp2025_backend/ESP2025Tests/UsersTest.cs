using ESP2025.Application.DTOS;
using ESP2025.Domain.Entities;
using ESP2025.Application.Exceptions;
using ESP2025.Application.Service.User;
using ESP2025.Application.UseCase;
using ESP2025.Domain.Interfaces.Repositories;
using Moq;

namespace ESP2025.ApplicationTests;

public class UsersTests
{
    private Mock<IUserRepository> _userRepositoryMock;
    private UserService _userService;
    private CreateUserUseCase _createUserUseCase;
    private DeleteUserUseCase _deleteUserUseCase;
    private GetAllUsersUseCase _getAllUsersUseCase;
    private GetUserByIdUseCase _getUserByIdUseCase;
    private ModifyStatusUserUseCase _modifyStatusUserUseCase;
    private UpdateUserUseCase _updateUserUseCase;

    User user1 = new User
    {
        IdUser = 1,
        GradeId = 1,
        Email = "user1@example.com",
        Ville = "Rivière-du-Loup",
        Province = "Québec",
        Pays = "Canada",
        NoMatricule = 101,
        FirstName = "Jean",
        LastName = "Tremblay",
        Points = 100,
        IsAdmin = false,
        IsActive = true,
        Password = "hashed_password"
    };

    User user2 = new User
    {
        IdUser = 2,
        GradeId = 2,
        Email = "admin@example.com",
        Ville = "Rivière-du-Loup",
        Province = "Québec",
        Pays = "Canada",
        NoMatricule = 201,
        FirstName = "Admin",
        LastName = "User",
        Points = 200,
        IsAdmin = true,
        IsActive = true,
        Password = "hashed_password"
    };

    [SetUp]
    public void Setup()
    {
        _userRepositoryMock = new Mock<IUserRepository>();
        _userService = new UserService(_userRepositoryMock.Object);
        _createUserUseCase = new CreateUserUseCase(_userRepositoryMock.Object);
        _deleteUserUseCase = new DeleteUserUseCase(_userRepositoryMock.Object, _userService);
        _getAllUsersUseCase = new GetAllUsersUseCase(_userRepositoryMock.Object);
        _getUserByIdUseCase = new GetUserByIdUseCase(_userRepositoryMock.Object);
        _modifyStatusUserUseCase = new ModifyStatusUserUseCase(_userRepositoryMock.Object);
        _updateUserUseCase = new UpdateUserUseCase(_userRepositoryMock.Object, _userService);

        // Configuration des mocks
        _userRepositoryMock.Setup(repo => repo.GetAll()).ReturnsAsync(new List<User> { user1, user2 });
        _userRepositoryMock.Setup(repo => repo.FindById(user1.IdUser)).ReturnsAsync(user1);
        _userRepositoryMock.Setup(repo => repo.Create(It.IsAny<User>())).ReturnsAsync(user1);
        _userRepositoryMock.Setup(repo => repo.Delete(user1.IdUser)).Returns(Task.CompletedTask);
        _userRepositoryMock.Setup(repo => repo.UpdateStatus(It.IsAny<int>(), It.IsAny<bool>())).ReturnsAsync(user1);
        _userRepositoryMock.Setup(repo => repo.Update(It.IsAny<User>())).ReturnsAsync(user1);
    }

    [Test]
    public async Task GetAllUsers_ShouldReturnAllUsers()
    {
        // Act
        var result = await _getAllUsersUseCase.Execute();

        // Assert
        Assert.That(result, Is.Not.Null, "Users list is returned");
        Assert.That(result.Count, Is.EqualTo(2), "Correct number of users returned");
        Assert.That(result[0].IdUser, Is.EqualTo(user1.IdUser), "First user ID matches");
        Assert.That(result[1].IdUser, Is.EqualTo(user2.IdUser), "Second user ID matches");
    }

    [Test]
    public async Task GetUserById_ShouldReturnUser()
    {
        // Act
        var result = await _getUserByIdUseCase.Execute(user1.IdUser);

        // Assert
        Assert.That(result, Is.Not.Null, "User is returned");
        Assert.That(result.IdUser, Is.EqualTo(user1.IdUser), "User ID matches");
        Assert.That(result.Email, Is.EqualTo(user1.Email), "User email matches");
    }

    [Test]
    public async Task GetUserById_WithNonExistentId_ShouldReturnNull()
    {
        // Arrange
        int nonExistentId = 999;
        _userRepositoryMock.Setup(repo => repo.FindById(nonExistentId)).ReturnsAsync((User)null);

        // Act
        var result = await _getUserByIdUseCase.Execute(nonExistentId);

        // Assert
        Assert.That(result, Is.Null, "Null is returned for non-existent user");
    }

    [Test]
    public async Task CreateUser_ShouldHashPasswordAndReturnCreatedUser()
    {
        // Arrange
        var createUserDto = new CreateUserDto
        {
            GradeId = 1,
            Email = "newuser@example.com",
            Ville = "Rivière-du-Loup",
            Province = "Québec",
            Pays = "Canada",
            NoMatricule = 301,
            FirstName = "New",
            LastName = "User",
            Points = 0,
            IsAdmin = false,
            IsActive = true,
            Password = "Password123"
        };

        // Act
        var result = await _createUserUseCase.Execute(createUserDto);

        // Assert
        Assert.That(result, Is.Not.Null, "User is created and returned");
        _userRepositoryMock.Verify(repo => repo.Create(It.Is<User>(u =>
            u.Email == createUserDto.Email &&
            u.Password != createUserDto.Password)), Times.Once,
            "Create method should be called with hashed password");
    }

    [Test]
    public async Task DeleteUser_ShouldCallRepositoryDelete()
    {
        // Act
        await _deleteUserUseCase.Execute(user1.IdUser);

        // Assert
        _userRepositoryMock.Verify(repo => repo.Delete(user1.IdUser), Times.Once);
    }

    [Test]
    public void DeleteUser_WithNonExistentId_ShouldThrowNotFoundException()
    {
        // Arrange
        int nonExistentId = 999;
        _userRepositoryMock.Setup(repo => repo.FindById(nonExistentId)).ReturnsAsync((User)null);

        // Act & Assert
        Assert.ThrowsAsync<NotFoundException>(() => _deleteUserUseCase.Execute(nonExistentId));
    }

    [Test]
    public async Task ModifyStatusUser_ShouldCallRepositoryUpdateStatus()
    {
        // Arrange
        var modifyStatusUserDto = new ModifyStatusUserDto
        {
            IdUser = user1.IdUser,
            IsActive = false
        };

        // Act
        var result = await _modifyStatusUserUseCase.Execute(modifyStatusUserDto);

        // Assert
        Assert.That(result, Is.Not.Null, "User with updated status is returned");
        _userRepositoryMock.Verify(repo => repo.UpdateStatus(user1.IdUser, false), Times.Once);
    }

    [Test]
    public void ModifyStatusUser_WithNullResponse_ShouldThrowException()
    {
        // Arrange
        var modifyStatusUserDto = new ModifyStatusUserDto
        {
            IdUser = 999,
            IsActive = false
        };
        _userRepositoryMock.Setup(repo => repo.UpdateStatus(999, false)).ReturnsAsync((User)null);

        // Act & Assert
        Assert.ThrowsAsync<Exception>(() => _modifyStatusUserUseCase.Execute(modifyStatusUserDto));
    }

    [Test]
    public async Task UpdateUser_ShouldCallRepositoryUpdate()
    {
        // Arrange
        var updateUserDto = new UpdateUserDto
        {
            IdUser = user1.IdUser,
            GradeId = user1.GradeId,
            Email = user1.Email,
            Ville = "Nouvelle Ville",
            Province = user1.Province,
            Pays = user1.Pays,
            NoMatricule = user1.NoMatricule,
            FirstName = user1.FirstName,
            LastName = user1.LastName,
            Points = 150,
            IsAdmin = user1.IsAdmin,
            IsActive = user1.IsActive
        };

        // Act
        var result = await _updateUserUseCase.Execute(updateUserDto);

        // Assert
        Assert.That(result, Is.Not.Null, "Updated user is returned");
        _userRepositoryMock.Verify(repo => repo.Update(It.Is<User>(u =>
            u.IdUser == updateUserDto.IdUser &&
            u.Ville == updateUserDto.Ville &&
            u.Points == updateUserDto.Points)), Times.Once);
    }

    [Test]
    public void UpdateUser_WithNonExistentId_ShouldThrowNotFoundException()
    {
        // Arrange
        int nonExistentId = 999;
        _userRepositoryMock.Setup(repo => repo.FindById(nonExistentId)).ReturnsAsync((User)null);

        var updateUserDto = new UpdateUserDto
        {
            IdUser = nonExistentId,
            GradeId = 1,
            Email = "nonexistent@example.com",
            Ville = "Test Ville",
            Province = "Test Province",
            Pays = "Test Pays",
            NoMatricule = 999,
            FirstName = "Non",
            LastName = "Existent",
            Points = 0,
            IsAdmin = false,
            IsActive = true
        };

        // Act & Assert
        Assert.ThrowsAsync<NotFoundException>(() => _updateUserUseCase.Execute(updateUserDto));
    }

    [Test]
    public void UpdateUser_WithNullResponse_ShouldThrowException()
    {
        // Arrange
        var updateUserDto = new UpdateUserDto
        {
            IdUser = user1.IdUser,
            // autres propriétés
        };
        _userRepositoryMock.Setup(repo => repo.Update(It.IsAny<User>())).ReturnsAsync((User)null);

        // Act & Assert
        Assert.ThrowsAsync<Exception>(() => _updateUserUseCase.Execute(updateUserDto));
    }
}