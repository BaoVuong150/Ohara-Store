using Ohara.Modules.Auth.Application.Interfaces;
using Ohara.Modules.Auth.Application.Services;
using Microsoft.Extensions.DependencyInjection;

namespace Ohara.Modules.Auth;

public static class AuthModuleExtensions
{
    public static IServiceCollection AddAuthModule(this IServiceCollection services)
    {
        services.AddScoped<IJwtTokenService, JwtTokenService>();
        services.AddScoped<IAuthService, AuthService>();
        return services;
    }
}

