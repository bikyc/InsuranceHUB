using InsuranceHub.Domain.Models.SSF;

namespace InsuranceHub.Application.Interfaces
{
    public interface ISSFService
    {
        Task<ResponseMessage<EligibilityResponse>> GetPatientEligibilityAsync(string patientNo, string visitDate);
        Task<ResponseMessage<SSFPatientDetails>> GetPatientDetailsAsync(string patientNo);
    }
}
