using System;
using System.Collections.Generic;

namespace ESP2025.Domain.Entities;

public partial class Grade
{
    public int IdGrade { get; set; }

    public string NomGrade { get; set; } = null!;

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
