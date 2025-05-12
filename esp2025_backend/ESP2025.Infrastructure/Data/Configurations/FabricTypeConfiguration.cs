using ESP2025.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ESP2025.Infrastructure.Data.Configurations;

public class FabricTypeConfiguration : IEntityTypeConfiguration<FabricType>
{
    public void Configure(EntityTypeBuilder<FabricType> builder)
    {
        builder.HasKey(f => f.IdFabricType);

        builder.Property(f => f.Name).IsRequired().HasMaxLength(50);
    }
}