using ESP2025.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ESP2025.Infrastructure.Data.Configurations;

public class OrderItemConfiguration : IEntityTypeConfiguration<OrderItem>
{
    public void Configure(EntityTypeBuilder<OrderItem> builder)
    {
        builder.HasKey(oi => oi.IdOrderItem);

        builder.Property(oi => oi.Quantity)
            .IsRequired();

        builder.Property(oi => oi.PointsAtPurchase)
            .IsRequired();

        // Relations
        builder.HasOne(oi => oi.Order)
            .WithMany(o => o.OrderItems)
            .HasForeignKey(oi => oi.OrderId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(oi => oi.Product)
            .WithMany()
            .HasForeignKey(oi => oi.ProductId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(oi => oi.Size)
            .WithMany()
            .HasForeignKey(oi => oi.SizeId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}