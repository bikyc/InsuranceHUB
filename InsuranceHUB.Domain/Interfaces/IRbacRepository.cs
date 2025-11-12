using InsuranceHub.Domain.Models;
using InsuranceHub.Domain.Models.RBAC;
namespace InsuranceHub.Domain.Interfaces
{
    public interface IRbacRepository
    {
        Task<List<RbacPermission>> GetAllPermissionsAsync();
        Task<List<RbacRole>> GetAllRolesAsync();
        Task<List<UserRoleMap>> GetAllUserRoleMapsAsync();
        Task<List<InsHubRoute>> GetAllRoutesAsync();
        Task<List<RolePermissionMap>> GetAllRolePermissionMapsAsync();
        Task<List<RbacApplication>> GetAllApplicationsAsync();
        List<InsHubRoute> GetRoutesForUser(int userId, bool getHierarchy);
        Task<RbacUser?> GetUserByIdAsync(int userId);

    }
}
