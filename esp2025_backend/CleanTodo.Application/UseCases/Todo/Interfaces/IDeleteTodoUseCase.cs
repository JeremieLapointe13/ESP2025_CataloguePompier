namespace ESP2025.Application.UseCase;

public interface IDeleteTodoUseCase
{
    Task Execute(Guid id);
}