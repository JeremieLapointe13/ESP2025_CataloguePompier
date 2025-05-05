using ESP2025.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ESP2025.Infrastructure.Data.Configurations;

public class OrderStatusConfiguration : IEntityTypeConfiguration<OrderStatus>
{
    public void Configure(EntityTypeBuilder<OrderStatus> builder)
    {
        builder.HasKey(os => os.IdOrderStatus);

        builder.Property(os => os.Status)
            .IsRequired()
            .HasMaxLength(50);

        // Données de référence pour les statuts de commande
        builder.HasData(
            new OrderStatus { IdOrderStatus = 1, Status = "pending" },
            new OrderStatus { IdOrderStatus = 2, Status = "shipped" },
            new OrderStatus { IdOrderStatus = 3, Status = "delivered" },
            new OrderStatus { IdOrderStatus = 4, Status = "cancelled" }
        );
    }
}