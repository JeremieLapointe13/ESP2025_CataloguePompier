using CleanTodo.Application.Service.User;
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
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IGetAllUsersUseCase, GetAllUsersUseCase>();

        return services;
    }
}