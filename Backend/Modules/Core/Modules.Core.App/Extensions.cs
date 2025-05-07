using Microsoft.Extensions.DependencyInjection;
using Modules.Core.App.Services.StreakService;

namespace Modules.Core.App;

public static class Extensions
{
    public static IServiceCollection AddApplicationLayer(this IServiceCollection services)
    {
        services.AddScoped<IStreakCacheService, StreakCacheService>();

        return services;
    }
}
