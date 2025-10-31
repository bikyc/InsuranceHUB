using AutoMapper;
using InsuranceHub.Application.Models.HIB;
using InsuranceHub.Application.Models.Patient;
using InsuranceHub.Domain.Models;
using InsuranceHub.Domain.Models.Patient;
using InsuranceHub.Domain.Models.RBAC;
using InsuranceHub.Domain.Models.SSF;
using static InsuranceHub.Domain.Models.HIB.HIBApiResponses;

namespace InsuranceHub.Application.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<PatientModel, PatientModel_Dto>();
            CreateMap<GetEligibilityApiResponse, HIBApiResponses_Dto.GetEligibilityApiResponse>();
            CreateMap<SSFPatientDetails, SSFPatientDetails_Dto>();
            CreateMap<SSFResponse, SSFResponse_Dto>();
            CreateMap<SSFPatientEligibility, SSFPatientEligibility_Dto>();
            CreateMap<InsHubRoute, InsHubRoute_Dto>();
            CreateMap<RbacApplication, RbacApplication_Dto>();
            CreateMap<RbacPermission, RbacPermission_Dto>();
            CreateMap<RbacRole, RbacRole_Dto>();
            CreateMap<RbacUser, RbacUser_Dto>();
        }
    }
}
