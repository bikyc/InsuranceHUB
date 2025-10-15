using InsuranceHub.Shared.Responses;
using static InsuranceHub.Application.Models.HIB.HIBApiResponses_Dto;

namespace InsuranceHub.Application.Interfaces
{
    public interface IHIBService
    {
        Task<ResponseMessage<GetEligibilityApiResponse>> GetPatientEligibilityAsync(string nshiNumber);
        Task<ResponseMessage<GetPatientDetailsAndEligibilityApiResponse>> GetPatientDetailsAsync(string nshiNumber);
    }
}
