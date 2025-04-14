using ESP2025.Application.Service.User;
using ESP2025.Application.UseCase;
using ESP2025.Application.UseCase.Auth;
using ESP2025.Application.Services.Auth;
using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace ESP2025.Application;
public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IGetAllUsersUseCase, GetAllUsersUseCase>();
        services.AddScoped<IGetUserByIdUseCase, GetUserByIdUseCase>();
        services.AddScoped<ICreateUserUseCase, CreateUserUseCase>();
        services.AddScoped<IDeleteUserUseCase, DeleteUserUseCase>();
        services.AddScoped<IModifyStatusUserUseCase, ModifyStatusUserUseCase>();

        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<ILoginUseCase, LoginUseCase>();

        return services;
    }
}