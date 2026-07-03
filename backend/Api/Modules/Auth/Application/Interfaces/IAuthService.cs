using Ohara.Modules.Auth.Application.DTOs;
using Ohara.Modules.Users.Application.DTOs;

namespace Ohara.Modules.Auth.Application.Interfaces;

public interface IAuthService
{
    Task<UserDto> RegisterAsync(RegisterDto dto);
    Task<TokenDto> LoginAsync(LoginDto dto);
    Task<TokenDto> RefreshTokenAsync(RefreshTokenRequestDto dto);
    Task LogoutAsync(string userId, string? refreshToken);
}

