using CleanTodo.Application.Service.Todo;
using CleanTodo.Application.UseCase;
using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace CleanTodo.Application;
public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {

        services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
        services.AddScoped<ITodoService, TodoService>();
        services.AddScoped<ICreateTodoUseCase, CreateTodoUseCase>();
        services.AddScoped<IDeleteTodoUseCase, DeleteTodoUseCase>();
        services.AddScoped<IGetAllTodosUseCase, GetAllTodosUseCase>();
        services.AddScoped<IToggleTodoCompleteStatusUseCase, ToggleTodoCompleteStatusUseCase>();

        return services;
    }
}