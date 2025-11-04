using InsuranceHub.Application.Interfaces;
using InsuranceHub.Domain.Interfaces;
using InsuranceHub.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InsuranceHub.Infrastructure.Persistence.Repository
{

    public class ClaimManagementRepository : IClaimManagementRepository
    {
        private readonly ClaimManagementDbContext _dbContext;

        public ClaimManagementRepository(ClaimManagementDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public List<CreditOrganization> GetInsuranceApplicableCreditOrganizations()
        {
            return _dbContext.CreditOrganizations
                             .Where(c => c.IsClaimManagementApplicable)
                             .ToList();
        }
    }

}
