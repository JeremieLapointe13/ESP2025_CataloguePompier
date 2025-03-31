namespace CleanTodo.Application.UseCase;

public interface IToggleTodoCompleteStatusUseCase
{
    Task Execute(Guid id);
}