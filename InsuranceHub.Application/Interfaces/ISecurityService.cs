using InsuranceHub.Domain.Models;
using InsuranceHub.Domain.Models.RBAC;
using System.Security.Claims;

namespace InsuranceHub.Application.Interfaces
{
    public interface ISecurityService
    {
        Task<ResponseMessage<List<InsHubRoute>>> GetNavigationRoutesForUserAsync(int userId);
        RbacUser? GetCurrentUser(ClaimsPrincipal user);

    }
}
