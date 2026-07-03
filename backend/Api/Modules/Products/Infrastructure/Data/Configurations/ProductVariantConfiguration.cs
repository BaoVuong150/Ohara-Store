using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Ohara.Modules.Products.Domain.Entities;

namespace Ohara.Modules.Products.Infrastructure.Data.Configurations;

public class ProductVariantConfiguration : IEntityTypeConfiguration<ProductVariant>
{
    public void Configure(EntityTypeBuilder<ProductVariant> builder)
    {
        builder.ToTable("ProductVariants", "products", t =>
        {
            t.HasCheckConstraint("CK_ProductVariant_Price_NonNegative", "\"Price\" >= 0");
            t.HasCheckConstraint("CK_ProductVariant_OriginalPrice_NonNegative", "\"OriginalPrice\" >= 0");
            t.HasCheckConstraint("CK_ProductVariant_StockQuantity_NonNegative", "\"StockQuantity\" >= 0");
        });
        builder.HasKey(pv => pv.Id);

        builder.Property(pv => pv.ProductId)
            .IsRequired();

        builder.Property(pv => pv.SKU)
            .IsRequired()
            .HasMaxLength(50);

        builder.Property(pv => pv.Color)
            .HasMaxLength(50);

        builder.Property(pv => pv.Size)
            .HasMaxLength(50);

        builder.Property(pv => pv.Price)
            .HasColumnType("decimal(18,2)");

        builder.Property(pv => pv.OriginalPrice)
            .HasColumnType("decimal(18,2)");

        // Ràng buộc duy nhất cho SKU
        builder.HasIndex(pv => pv.SKU).IsUnique();

        // Ràng buộc khóa ngoại với bảng Products (Xóa dây chuyền)
        builder.HasOne<Product>()
            .WithMany()
            .HasForeignKey(pv => pv.ProductId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
