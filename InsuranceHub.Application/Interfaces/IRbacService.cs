using InsuranceHub.Domain.Models;
using InsuranceHub.Domain.Models.RBAC;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace InsuranceHub.Application.Interfaces
{
    public interface IRbacService
    {
        Task<List<InsHubRoute>> GetRoutesForUserAsync(int userId, bool getHierarchy);
        Task<List<RbacPermission>> GetUserAllPermissionsAsync(int userId);
        Task<List<RbacPermission>> GetAllPermissionsAsync();
        Task<List<RbacRole>> GetAllRolesAsync();
        Task<List<UserRoleMap>> GetAllUserRoleMapsAsync();
        Task<List<RolePermissionMap>> GetAllRolePermissionMapsAsync();
        Task<List<RbacApplication>> GetAllApplicationsAsync();
        Task<List<InsHubRoute>> GetAllRoutesAsync();
        Task<ResponseMessage<List<InsHubRoute>>> GetNavigationRoutesForUserAsync(int userId, bool getHierarchy = true);

    }
}
