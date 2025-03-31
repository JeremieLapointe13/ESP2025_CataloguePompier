using System;
using System.Collections.Generic;

namespace CleanTodo.Domain.Entities;

public partial class Grade
{
    public int IdGrade { get; set; }

    public string NomGrade { get; set; } = null!;

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
