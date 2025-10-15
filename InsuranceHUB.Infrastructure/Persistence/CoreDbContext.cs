
using InsuranceHub.Domain.Interfaces;
using InsuranceHub.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace InsuranceHub.Infrastructure.Persistence;

public class CoreDbContext : DbContext, IUnitOfWork
{
    public CoreDbContext(DbContextOptions<CoreDbContext> options)
        : base(options)
    {
    }
    public DbSet<ParameterModel> Parameters { get; set; }

    public IPatientRepository Patients => throw new NotImplementedException();

    IParameterRepository IUnitOfWork.Parameters => throw new NotImplementedException();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ParameterModel>().ToTable("CORE_CFG_Parameters");

    }

    public async Task SaveChangesAsync() => await base.SaveChangesAsync();

    Task<int> IUnitOfWork.SaveChangesAsync()
    {
        throw new NotImplementedException();
    }
}