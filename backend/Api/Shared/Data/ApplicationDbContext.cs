using Ohara.Modules.Users.Domain.Entities;
using Ohara.Modules.Products.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Ohara.Shared.Data;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : IdentityDbContext<AppUser>(options)
{
    // Đăng ký các DbSet (bảng) cho Module Products
    public DbSet<Category> Categories { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<ProductVariant> ProductVariants { get; set; }
    public DbSet<ProductImage> ProductImages { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        // 1. Định cấu hình đưa toàn bộ các bảng Identity vào schema "users" và đổi tên cho gọn sạch
        builder.Entity<AppUser>().ToTable("Users", "users");
        builder.Entity<IdentityRole>().ToTable("Roles", "users");
        builder.Entity<IdentityUserRole<string>>().ToTable("UserRoles", "users");
        builder.Entity<IdentityUserClaim<string>>().ToTable("UserClaims", "users");
        builder.Entity<IdentityUserLogin<string>>().ToTable("UserLogins", "users");
        builder.Entity<IdentityRoleClaim<string>>().ToTable("RoleClaims", "users");
        builder.Entity<IdentityUserToken<string>>().ToTable("UserTokens", "users");

        // 2. Tự động áp dụng tất cả các Fluent API configurations trong Assembly
        builder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
    }
}


