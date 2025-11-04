using InsuranceHub.Domain.Models;
using InsuranceHub.Domain.Models.RBAC;
using System.Security.Claims;

namespace InsuranceHub.Application.Interfaces
{
    public interface ISecurityService
    {
        Task<ResponseMessage<List<InsHubRoute>>> NavigationRouteList(RbacUser currentUser);
        RbacUser? GetCurrentUser(ClaimsPrincipal user);

    }
}
