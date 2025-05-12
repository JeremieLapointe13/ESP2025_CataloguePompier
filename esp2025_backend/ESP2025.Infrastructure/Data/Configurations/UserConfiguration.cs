using ESP2025.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ESP2025.Infrastructure.Data.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.HasKey(u => u.IdUser);

        builder.Property(u => u.Email).IsRequired().HasMaxLength(100);
        builder.Property(u => u.FirstName).IsRequired().HasMaxLength(50);
        builder.Property(u => u.LastName).IsRequired().HasMaxLength(50);
        builder.Property(u => u.Ville).IsRequired().HasMaxLength(50);
        builder.Property(u => u.Province).IsRequired().HasMaxLength(50);
        builder.Property(u => u.Pays).IsRequired().HasMaxLength(50);
        builder.Property(u => u.Password).IsRequired().HasMaxLength(255);
        builder.Property(u => u.IsActive).HasDefaultValue(true);
        builder.Property(u => u.LoginAttempts).HasDefaultValue(0);

        builder.HasOne(u => u.Grade)
            .WithMany(g => g.Users)
            .HasForeignKey(u => u.GradeId);
    }
}