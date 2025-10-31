using InsuranceHub.Domain.Interfaces;
using InsuranceHub.Infrastructure.Persistence;
using InsuranceHub.Infrastructure.Persistence.Repository.PatientRepository;
using InsuranceHUB.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

public class UnitOfWork : IUnitOfWork, IDisposable
{
    private readonly List<DbContext> _dbContexts;

    public UnitOfWork(AppDbContext appContext, CoreDbContext coreContext, InsuranceDbContext insuranceContext)
    {
        _dbContexts = new List<DbContext> { appContext, coreContext, insuranceContext };

        Patients = new PatientRepository(appContext);
        Parameters = new ParameterRepository(coreContext);
    }

    public IPatientRepository Patients { get;  set; }
    public IParameterRepository Parameters { get; set; }

    public async Task<int> SaveChangesAsync()
    {
        int totalChanges = 0;

        foreach (var context in _dbContexts)
        {
            totalChanges += await context.SaveChangesAsync();
        }

        return totalChanges;
    }

    public void Dispose()
    {
        foreach (var context in _dbContexts)
        {
            context.Dispose();
        }
    }
}
