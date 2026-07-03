using Ohara.Modules.Users.Application.DTOs;

namespace Ohara.Modules.Users.Application.Interfaces;

public interface IUserService
{
    Task<UserDto?> GetProfileAsync(string userId);
    Task<UserDto?> UpdateProfileAsync(string userId, UpdateUserDto dto);
}

