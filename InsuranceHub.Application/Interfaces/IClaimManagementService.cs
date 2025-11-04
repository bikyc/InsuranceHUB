using InsuranceHub.Application.DTOs;
using InsuranceHub.Domain.Models.RBAC;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InsuranceHub.Application.Interfaces
{
    public interface IClaimManagementService
    {
        List<CreditOrganization_DTO> GetInsuranceApplicableCreditOrganizations();
    }
}
