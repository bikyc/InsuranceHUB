using InsuranceHub.Domain.Interfaces;
using InsuranceHub.Domain.Models.HIB;
using InsuranceHub.Domain.Models.Patient;

namespace InsuranceHUB.Infrastructure.Persistence.PatientRepository
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
