using InsuranceHub.Domain.Interfaces;
using InsuranceHub.Domain.Models;
using InsuranceHub.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace InsuranceHUB.Infrastructure.Persistence
{
    public class InsuranceDbContext: DbContext, IUnitOfWork
    {
        public InsuranceDbContext(DbContextOptions<InsuranceDbContext> options)
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
}
