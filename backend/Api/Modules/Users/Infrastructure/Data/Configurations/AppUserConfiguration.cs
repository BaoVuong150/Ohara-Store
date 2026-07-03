using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Ohara.Modules.Users.Domain.Entities;

namespace Ohara.Modules.Users.Infrastructure.Data.Configurations;

public class AppUserConfiguration : IEntityTypeConfiguration<AppUser>
{
    public void Configure(EntityTypeBuilder<AppUser> builder)
    {
        builder.ToTable("Users", "users");

        // Đánh chỉ mục (Index) cho RefreshToken để tối ưu hóa truy vấn khi F5/Refresh session
        builder.HasIndex(u => u.RefreshToken);
    }
}
