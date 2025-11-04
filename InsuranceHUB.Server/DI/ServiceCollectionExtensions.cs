using InsuranceHub.Application.Interfaces;
using InsuranceHub.Application.Mappings;
using InsuranceHub.Application.Services;
using InsuranceHub.Domain.Interfaces;
using InsuranceHub.Infrastructure.Persistence;
using InsuranceHub.Infrastructure.Persistence.Repository;
using InsuranceHub.Infrastructure.Services.Cache;
using InsuranceHUB.Infrastructure.Persistence;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System;
using System.Text;

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

            return services;
        }

        public static IServiceCollection AddInsuranceHubApplication(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<IHIBService, HIBService>();
            services.AddScoped<IClaimManagementService, ClaimManagementService>();
            services.AddScoped<ISecurityService, SecurityService>();
            services.AddScoped<IClaimManagementRepository, ClaimManagementRepository>();
            services.AddScoped<IRbacRepository, RbacRepository>();

            services.AddAutoMapper(typeof(MappingProfile));
            services.AddHttpClient();

            return services;
        }

        public static IServiceCollection AddInsuranceHubApi(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddControllers()
                .AddJsonOptions(options =>
                {
                    // Preserve property names as they are in C# (PascalCase)
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

            services.AddMemoryCache();
            services.AddScoped<ICacheService, MemoryCacheService>();

            return services;
        }
}
}
