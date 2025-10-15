using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static InsuranceHub.Domain.Models.HIB.HIBApiResponses;

namespace InsuranceHub.Domain.Interfaces
{
    public  interface IHIBRepository
    {
        Task<Patient> GetByNSHINumberAsync(string nshiNumber);
        Task<GetEligibilityApiResponse> GetEligibilityByNSHINumberAsync(string nshiNumber);
    }
}
