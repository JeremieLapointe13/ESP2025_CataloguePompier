using CleanTodo.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CleanTodo.Infrastructure.Data.Configurations;

public class GradeConfiguration : IEntityTypeConfiguration<Grade>
{
    public void Configure(EntityTypeBuilder<Grade> builder)
    {
        builder.HasKey(g => g.IdGrade);
        builder.Property(g => g.NomGrade).IsRequired().HasMaxLength(50);
    }
}