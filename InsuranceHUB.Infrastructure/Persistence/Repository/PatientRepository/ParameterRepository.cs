using Microsoft.EntityFrameworkCore;
using InsuranceHub.Domain.Interfaces;
using InsuranceHub.Domain.Models;

namespace InsuranceHub.Infrastructure.Persistence.Repository.PatientRepository;

public class ParameterRepository : IParameterRepository
{
    private readonly CoreDbContext _context;

    public ParameterRepository(CoreDbContext context)
    {
        _context = context;
    }

    public async Task<ParameterModel> GetParameter(string parameterName, string groupName)
    {
        return await _context.Parameters.FirstOrDefaultAsync(p => p.ParameterName == parameterName && p.ParameterGroupName == groupName);
    }
}