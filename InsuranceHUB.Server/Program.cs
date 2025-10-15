using InsuranceHub.Api.Middleware;
using InsuranceHub.Server.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

// -----------------------------
// DI Layers
// -----------------------------
builder.Services.AddInsuranceHubInfrastructure(builder.Configuration);
builder.Services.AddInsuranceHubApplication(builder.Configuration);
builder.Services.AddInsuranceHubApi(builder.Configuration);

var app = builder.Build();

// -----------------------------
// Middleware pipeline
// -----------------------------
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "InsuranceHub API v1");
        c.RoutePrefix = "swagger";
    });
}

app.UseMiddleware<ErrorHandlingMiddleware>();
app.UseHttpsRedirection();
app.UseCors("AllowDanphe");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
