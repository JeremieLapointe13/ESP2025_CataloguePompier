namespace ESP2025.Application.UseCase;

public interface IToggleTodoCompleteStatusUseCase
{
    Task Execute(Guid id);
}