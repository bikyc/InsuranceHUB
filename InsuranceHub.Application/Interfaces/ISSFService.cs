using InsuranceHub.Domain.Models.SSF;
using InsuranceHub.Shared.Responses;
using static InsuranceHub.Application.Models.HIB.HIBApiResponses_Dto;

namespace InsuranceHub.Application.Interfaces
{
    public interface ISSFService
    {
        Task<ResponseMessage<EligibilityResponse>> GetPatientEligibilityAsync(string patientNo, string visitDate);
        Task<ResponseMessage<SSFPatientDetails>> GetPatientDetailsAsync(string patientNo);
    }
}
