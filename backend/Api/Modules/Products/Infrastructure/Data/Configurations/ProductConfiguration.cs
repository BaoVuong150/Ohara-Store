using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Ohara.Modules.Products.Domain.Entities;

namespace Ohara.Modules.Products.Infrastructure.Data.Configurations;

public class ProductConfiguration : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder.ToTable("Products", "products");
        builder.HasKey(p => p.Id);

        builder.Property(p => p.Name)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(p => p.Slug)
            .IsRequired()
            .HasMaxLength(250);

        builder.Property(p => p.Description)
            .HasMaxLength(1000);

        builder.Property(p => p.Brand)
            .HasMaxLength(100);

        builder.Property(p => p.CategoryId)
            .IsRequired();

        // Ràng buộc duy nhất cho Product Slug
        builder.HasIndex(p => p.Slug).IsUnique();

        // Ràng buộc khóa ngoại với bảng Categories
        builder.HasOne<Category>()
            .WithMany()
            .HasForeignKey(p => p.CategoryId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
