using ESP2025.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ESP2025.Infrastructure.Data.Configurations;

public class ProductConfiguration : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder.HasKey(p => p.IdProduct);

        builder.Property(p => p.ProductNo).IsRequired().HasMaxLength(50);
        builder.HasIndex(p => p.ProductNo).IsUnique();

        builder.Property(p => p.Name).IsRequired().HasMaxLength(100);
        builder.Property(p => p.Points).HasDefaultValue(0);
        builder.Property(p => p.IsActive).HasDefaultValue(true);
        builder.Property(p => p.Quantity).HasDefaultValue(0);

        // Relations
        builder.HasOne(p => p.Category)
            .WithMany(c => c.Products)
            .HasForeignKey(p => p.CategoryId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(p => p.Supplier)
            .WithMany(s => s.Products)
            .HasForeignKey(p => p.SupplierId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(p => p.Size)
            .WithMany(s => s.Products)
            .HasForeignKey(p => p.SizeId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(p => p.FabricType)
            .WithMany(f => f.Products)
            .HasForeignKey(p => p.FabricTypeId)
            .OnDelete(DeleteBehavior.SetNull);
    }
}