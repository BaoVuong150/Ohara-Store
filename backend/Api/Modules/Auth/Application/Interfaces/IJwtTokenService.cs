using System.Security.Claims;
using Ohara.Modules.Users.Domain.Entities;

namespace Ohara.Modules.Auth.Application.Interfaces;

public interface IJwtTokenService
{
    string GenerateAccessToken(AppUser user, IList<string> roles);
    string GenerateRefreshToken();
    ClaimsPrincipal GetPrincipalFromExpiredToken(string token);
}

