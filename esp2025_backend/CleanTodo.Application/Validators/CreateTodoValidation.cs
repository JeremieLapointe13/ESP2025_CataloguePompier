using ESP2025.Application.DTOS;
using FluentValidation;

namespace ESP2025.Application.Validators;

// Valide automatiquement CreateTodoDto quand il est créé dans le controller
public class CreateTodoValidation : AbstractValidator<CreateTodoDto>
{
    public CreateTodoValidation()
    {
        RuleFor(x => x.Title)
            .NotEmpty()
            .MaximumLength(200);
    }
}