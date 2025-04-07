using ESP2025.Application.DTOS;

namespace ESP2025.Application.UseCase;
public interface IDeleteUserUseCase
{
    Task Execute(int idUser);
}
