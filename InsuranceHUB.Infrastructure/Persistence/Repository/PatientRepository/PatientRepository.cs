using InsuranceHub.Domain.Interfaces;
using InsuranceHub.Domain.Models.HIB;
using InsuranceHub.Domain.Models.Patient;
using InsuranceHUB.Infrastructure.Persistence;

namespace InsuranceHub.Infrastructure.Persistence.Repository.PatientRepository
{
    public class PatientRepository : IPatientRepository
    {
        private readonly AppDbContext _context;

        public PatientRepository(AppDbContext context)
        {
            _context = context;
        }


    }
}
