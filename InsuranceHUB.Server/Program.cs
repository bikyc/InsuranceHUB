using InsuranceHub.Server.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddInsuranceHubInfrastructure(builder.Configuration);
builder.Services.AddInsuranceHubApplication(builder.Configuration);
builder.Services.AddInsuranceHubApi(builder.Configuration);

var app = builder.Build();

app.UseHttpsRedirection();
app.UseCors("AllowDanphe");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
