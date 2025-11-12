using InsuranceHub.Application.Interfaces;
using InsuranceHub.Application.Mappings;
using InsuranceHub.Application.Services;
using InsuranceHub.Domain.Interfaces;
using InsuranceHub.Infrastructure.Persistence;
using InsuranceHub.Infrastructure.Persistence.Repository;
using InsuranceHub.Infrastructure.Services.Cache;
using InsuranceHUB.Infrastructure.Persistence;
using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using System;

namespace InsuranceHub.Server.DependencyInjection
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddInsuranceHubInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("DefaultConnection");

            services.AddDbContext<AppDbContext>(options => options.UseSqlServer(connectionString));
            services.AddDbContext<CoreDbContext>(options => options.UseSqlServer(connectionString));
            services.AddDbContext<InsuranceDbContext>(options => options.UseSqlServer(connectionString));
            services.AddDbContext<ClaimManagementDbContext>(options => options.UseSqlServer(connectionString));
            services.AddDbContext<RbacDbContext>(options => options.UseSqlServer(connectionString));

            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IRbacRepository, RbacRepository>();

            return services;
        }

        public static IServiceCollection AddInsuranceHubApplication(this IServiceCollection services, IConfiguration configuration)
        {
            // Services
            services.AddScoped<IHIBService, HIBService>();
            services.AddScoped<IClaimManagementService, ClaimManagementService>();
            services.AddScoped<ISecurityService, SecurityService>();

            // Repository already registered in Infrastructure
            // Cache service
            services.AddMemoryCache();
            services.AddScoped<ICacheService, MemoryCacheService>();

            // Register RbacService with explicit cacheExpiryMinutes
            services.AddScoped<IRbacService>(sp =>
                new RbacService(
                    sp.GetRequiredService<IRbacRepository>(),
                    sp.GetRequiredService<ICacheService>(),
                    cacheExpiryMinutes: 60 // positive value to avoid MemoryCache error
                ));

            services.AddScoped<IClaimManagementRepository, ClaimManagementRepository>();

            // AutoMapper
            services.AddAutoMapper(typeof(MappingProfile));

            // HttpClient
            services.AddHttpClient();

            return services;
        }

        public static IServiceCollection AddInsuranceHubApi(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddControllers()
                .AddJsonOptions(options =>
                {
                    // Preserve property names (PascalCase)
                    options.JsonSerializerOptions.PropertyNamingPolicy = null;
                    options.JsonSerializerOptions.DictionaryKeyPolicy = null;
                });

            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "InsuranceHub API", Version = "v1" });
            });

            // Dummy authentication scheme for now
            services.AddAuthentication("UserIdAuth")
                .AddScheme<AuthenticationSchemeOptions, UserIdAuthHandler>("UserIdAuth", null);

            // CORS
            services.AddCors(options =>
            {
                options.AddPolicy("AllowDanphe", policy =>
                {
                    policy.WithOrigins(
                            "https://localhost:60635",
                            "https://localhost:4200",
                            "http://localhost:4200")
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials();
                });
            });

            // Session
            services.AddHttpContextAccessor();
            services.AddDistributedMemoryCache();
            services.AddSession(options =>
            {
                options.IdleTimeout = TimeSpan.FromHours(8);
                options.Cookie.HttpOnly = true;
                options.Cookie.IsEssential = true;
            });

            return services;
        }
    }
}
