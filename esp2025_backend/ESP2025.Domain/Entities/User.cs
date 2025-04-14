using System;
using System.Collections.Generic;

namespace ESP2025.Domain.Entities;

public partial class User
{
    public int IdUser { get; set; }

    public int? GradeId { get; set; }

    public string Email { get; set; } = null!;

    public string Ville { get; set; } = null!;

    public string Province { get; set; } = null!;

    public string Pays { get; set; } = null!;

    public int NoMatricule { get; set; }

    public string Password { get; set; } = null!;

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public int Points { get; set; }

    public bool IsAdmin { get; set; }

    public bool? IsActive { get; set; }

    public int LoginAttempts { get; set; }

    public virtual Grade? Grade { get; set; }
}
