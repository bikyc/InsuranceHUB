using InsuranceHub.Application.DTOs;
using InsuranceHub.Application.Interfaces;
using InsuranceHub.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InsuranceHub.Application.Services
{
    public class ClaimManagementService : IClaimManagementService
    {
        private readonly IClaimManagementRepository _repository;

        public ClaimManagementService(IClaimManagementRepository repository)
        {
            _repository = repository;
        }

        public List<CreditOrganization_DTO> GetInsuranceApplicableCreditOrganizations()
        {
            var entities = _repository.GetInsuranceApplicableCreditOrganizations();
            return entities.Select(c => new CreditOrganization_DTO
            {
                OrganizationId = c.OrganizationId,
                OrganizationName = c.OrganizationName,
                DisplayName = c.DisplayName,
                IsClaimManagementApplicable = c.IsClaimManagementApplicable,
                IsActive = c.IsActive
            }).ToList();
        }
    }

}
