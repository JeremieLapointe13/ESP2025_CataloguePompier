using ESP2025.Domain.Entities;

namespace ESP2025.Application.DTOS;

public class ModifyStatusUserDto
{
    public int IdUser { get; set; }
    public bool IsActive { get; set; }
}