using InsuranceHub.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InsuranceHub.Domain.Interfaces
{
    public interface IClaimManagementRepository
    {
        List<CreditOrganization> GetInsuranceApplicableCreditOrganizations();

    }
}
