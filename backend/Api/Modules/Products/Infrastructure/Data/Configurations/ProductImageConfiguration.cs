using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Ohara.Modules.Products.Domain.Entities;

namespace Ohara.Modules.Products.Infrastructure.Data.Configurations;

public class ProductImageConfiguration : IEntityTypeConfiguration<ProductImage>
{
    public void Configure(EntityTypeBuilder<ProductImage> builder)
    {
        builder.ToTable("ProductImages", "products");
        builder.HasKey(pi => pi.Id);

        builder.Property(pi => pi.ProductId)
            .IsRequired();

        builder.Property(pi => pi.ImageUrl)
            .IsRequired()
            .HasMaxLength(500);

        // Ràng buộc khóa ngoại với bảng Products (Xóa dây chuyền)
        builder.HasOne<Product>()
            .WithMany()
            .HasForeignKey(pi => pi.ProductId)
            .OnDelete(DeleteBehavior.Cascade);

        // Ràng buộc khóa ngoại với bảng ProductVariants (Xóa dây chuyền nếu xóa phiên bản)
        builder.HasOne<ProductVariant>()
            .WithMany()
            .HasForeignKey(pi => pi.ProductVariantId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
