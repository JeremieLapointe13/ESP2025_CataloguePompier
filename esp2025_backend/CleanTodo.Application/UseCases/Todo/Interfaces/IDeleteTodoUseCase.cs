namespace CleanTodo.Application.UseCase;

public interface IDeleteTodoUseCase
{
    Task Execute(Guid id);
}