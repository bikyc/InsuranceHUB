using InsuranceHub.Domain.Models;
using InsuranceHub.Domain.Models.RBAC;
using InsuranceHub.Shared.Responses;

namespace InsuranceHub.Application.Interfaces
{
    public interface ISecurityService
    {
        Task<ResponseMessage<List<InsHubRoute>>> NavigationRouteList(RbacUser currentUser);
    }
}
