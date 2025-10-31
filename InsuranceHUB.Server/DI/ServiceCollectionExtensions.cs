using InsuranceHub.Application.Interfaces;
using InsuranceHub.Application.Mappings;
using InsuranceHub.Application.Services;
using InsuranceHub.Domain.Interfaces;
using InsuranceHub.Infrastructure.Persistence;
using InsuranceHub.Infrastructure.Services.Cache;
using InsuranceHUB.Infrastructure.Persistence;
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
            // -----------------------------
            // DbContexts
            // -----------------------------
            services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));
            services.AddDbContext<CoreDbContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));
            services.AddDbContext<InsuranceDbContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

            // -----------------------------
            // UnitOfWork
            // -----------------------------
            services.AddScoped<IUnitOfWork, UnitOfWork>();

            return services;
        }

        public static IServiceCollection AddInsuranceHubApplication(this IServiceCollection services, IConfiguration configuration)
        {
            // -----------------------------
            // Application Services
            // -----------------------------
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IHIBService, HIBService>();

            // -----------------------------
            // AutoMapper
            // -----------------------------
            services.AddAutoMapper(typeof(MappingProfile));
            services.AddHttpClient();
            return services;
        }

        public static IServiceCollection AddInsuranceHubApi(this IServiceCollection services, IConfiguration configuration)
        {
            // -----------------------------
            // Controllers + JSON
            // -----------------------------
            services.AddControllers()
                .AddNewtonsoftJson(opts =>
                    opts.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

            // -----------------------------
            // Swagger
            // -----------------------------
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "InsuranceHub API", Version = "v1" });
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Name = "Authorization",
                    Type = SecuritySchemeType.Http,
                    Scheme = "bearer",
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Description = "Enter JWT token like: Bearer <token>"
                });
                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" }
                        },
                        Array.Empty<string>()
                    }
                });
            });

            // -----------------------------
            // JWT Authentication
            // -----------------------------
            services.AddJwtAuthentication(configuration);

            // -----------------------------
            // CORS
            // -----------------------------
            services.AddCors(options =>
            {
                options.AddPolicy("AllowDanphe", policy =>
                {
                    var origins = configuration.GetSection("AllowedOrigins")
                        .Get<string[]>()
                        ?? new[]
                        {
                            "https://localhost:44333",
                            "https://localhost:7047",
                            "http://localhost:5012",
                            "http://localhost:6064",
                            "http://localhost:56326"
                        };

                    policy.WithOrigins(origins)
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
