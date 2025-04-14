using ESP2025.Application.Service.User;
using ESP2025.Application.UseCase;
using ESP2025.Application.UseCase.Auth;
using ESP2025.Application.Services.Auth;
using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;
using ESP2025.Application.Service.Product;
using ESP2025.Application.UseCases.Product.Interfaces;
using ESP2025.Application.UseCases;

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

        services.AddScoped<IProductService, ProductService>();
        services.AddScoped<IGetAllProductsUseCase, GetAllProductsUseCase>();
        services.AddScoped<IGetProductByIdUseCase, GetProductByIdUseCase>();
        services.AddScoped<ICreateProductUseCase, CreateProductUseCase>();
        services.AddScoped<IUpdateProductUseCase, UpdateProductUseCase>();
        services.AddScoped<IDeleteProductUseCase, DeleteProductUseCase>();

        return services;
    }
}