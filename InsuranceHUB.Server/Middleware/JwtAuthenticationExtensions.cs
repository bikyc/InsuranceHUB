using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace InsuranceHub.Server.DependencyInjection
{
    public static class JwtAuthenticationExtensions
    {
        public static IServiceCollection AddJwtAuthentication(this IServiceCollection services, IConfiguration configuration)
        {
            var jwtSection = configuration.GetSection("JwtTokenConfig");
            var key = jwtSection["JwtKey"];
            var issuer = jwtSection["JwtIssuer"];
            var audience = jwtSection["JwtAudience"];

            Console.WriteLine($"JWT Key (length: {key?.Length ?? 0}): {key?.Substring(0, Math.Min(50, key?.Length ?? 0))}...");
            Console.WriteLine($"JWT Issuer: {issuer}");
            Console.WriteLine($"JWT Audience: {audience}");

            if (string.IsNullOrEmpty(key) || key.Length < 32)
                throw new InvalidOperationException("JWT Key is missing or too short.");
            if (string.IsNullOrEmpty(issuer))
                throw new InvalidOperationException("JWT Issuer is missing.");
            if (string.IsNullOrEmpty(audience))
                throw new InvalidOperationException("JWT Audience is missing.");

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = issuer,
                    ValidAudience = audience,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)),
                    ClockSkew = TimeSpan.FromSeconds(30)
                };

                options.Events = new JwtBearerEvents
                {
                    OnAuthenticationFailed = context =>
                    {
                        var error = context.Exception;
                        Console.WriteLine($"JWT Validation Failed: {error.Message}");
                        Console.WriteLine($"Exception Type: {error.GetType().Name}");
                        if (error.InnerException != null)
                            Console.WriteLine($"Inner Exception: {error.InnerException.Message}");
                        return Task.CompletedTask;
                    },
                    OnTokenValidated = context =>
                    {
                        Console.WriteLine("JWT Token Validated Successfully!");
                        return Task.CompletedTask;
                    },
                    OnChallenge = context =>
                    {
                        Console.WriteLine("JWT Challenge Triggered: No or Invalid Token");
                        return Task.CompletedTask;
                    }
                };
            });

            return services;
        }
    }
}