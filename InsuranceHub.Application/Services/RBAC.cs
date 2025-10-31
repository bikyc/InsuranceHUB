using InsuranceHub.Application.Interfaces;
using InsuranceHub.Domain.Interfaces;
using InsuranceHub.Domain.Models;
using InsuranceHub.Domain.Models.RBAC;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InsuranceHub.Application.Services
{
    public class RbacService : IRbacService
    {
        private readonly IRbacRepository _repo;
        private readonly ICacheService _cache;
        private readonly int _cacheExpiryMinutes;

        public RbacService(IRbacRepository repo, ICacheService cache, int cacheExpiryMinutes)
        {
            _repo = repo;
            _cache = cache;
            _cacheExpiryMinutes = cacheExpiryMinutes;
        }

        public async Task<List<InsHubRoute>> GetRoutesForUserAsync(int userId, bool getHierarchy)
        {
            var allRoutes = await GetAllRoutesAsync();
            var userAllPerms = await GetUserAllPermissionsAsync(userId);

            var matchedRoutes = (from route in allRoutes
                                 join perm in userAllPerms
                                 on route.PermissionId equals perm.PermissionId
                                 where route.IsActive
                                 select route)
                                 .Distinct()
                                 .OrderBy(r => r.DisplaySeq)
                                 .ToList();

            if (!getHierarchy)
                return matchedRoutes;

            var parentRoutes = matchedRoutes.Where(r => r.ParentRouteId == null && r.DefaultShow==true).ToList();
            foreach (var route in parentRoutes)
                route.ChildRoutes = GetChildRouteHierarchy(matchedRoutes, route);

            return parentRoutes;
        }

        private List<InsHubRoute> GetChildRouteHierarchy(List<InsHubRoute> routes, InsHubRoute parent)
        {
            var children = routes.Where(r => r.ParentRouteId == parent.RouteId).ToList();
            if (!children.Any())
                return null;

            foreach (var child in children)
                child.ChildRoutes = GetChildRouteHierarchy(routes, child);

            return children;
        }

        public async Task<List<RbacPermission>> GetUserAllPermissionsAsync(int userId)
        {
            var cacheKey = $"RBAC-UserPermissions-{userId}";
            var permissions = _cache.Get<List<RbacPermission>>(cacheKey);
            if (permissions != null)
                return permissions;

            var isSysAdmin = await UserIsSuperAdminAsync(userId);
            if (isSysAdmin)
            {
                permissions = await GetAllPermissionsAsync();
            }
            else
            {
                var allRoles = await _repo.GetAllRolesAsync();
                var allRolePermMaps = await _repo.GetAllRolePermissionMapsAsync();
                var allUserRoleMaps = await _repo.GetAllUserRoleMapsAsync();
                var allPerms = await _repo.GetAllPermissionsAsync();
                var allApps = await _repo.GetAllApplicationsAsync();

                permissions = (from urole in allUserRoleMaps
                               where urole.UserId == userId && urole.IsActive
                               join role in allRoles on urole.RoleId equals role.RoleId
                               join rolePerm in allRolePermMaps on role.RoleId equals rolePerm.RoleId
                               join perm in allPerms on rolePerm.PermissionId equals perm.PermissionId
                               where rolePerm.IsActive
                               join app in allApps on perm.ApplicationId equals app.ApplicationId
                               where app.IsActive
                               select perm).ToList();
            }

            _cache.Set(cacheKey, permissions, _cacheExpiryMinutes);
            return permissions;
        }

        private async Task<bool> UserIsSuperAdminAsync(int userId)
        {
            var allRoles = await _repo.GetAllRolesAsync();
            var userRoles = await _repo.GetAllUserRoleMapsAsync();

            return (from ur in userRoles
                    where ur.UserId == userId
                    join role in allRoles on ur.RoleId equals role.RoleId
                    where role.IsSysAdmin
                    select role).Any();
        }

        public async Task<List<RbacPermission>> GetAllPermissionsAsync()
        {
            const string cacheKey = "RBAC-Perms-All";
            var list = _cache.Get<List<RbacPermission>>(cacheKey);
            if (list != null)
                return list;

            list = await _repo.GetAllPermissionsAsync();
            _cache.Set(cacheKey, list, _cacheExpiryMinutes);
            return list;
        }

        public async Task<List<RbacRole>> GetAllRolesAsync()
        {
            const string cacheKey = "RBAC-Roles-All";
            var list = _cache.Get<List<RbacRole>>(cacheKey);
            if (list != null)
                return list;

            list = await _repo.GetAllRolesAsync();
            _cache.Set(cacheKey, list, _cacheExpiryMinutes);
            return list;
        }

        public async Task<List<UserRoleMap>> GetAllUserRoleMapsAsync()
        {
            const string cacheKey = "RBAC-UserRoleMaps-All";
            var list = _cache.Get<List<UserRoleMap>>(cacheKey);
            if (list != null)
                return list;

            list = await _repo.GetAllUserRoleMapsAsync();
            _cache.Set(cacheKey, list, _cacheExpiryMinutes);
            return list;
        }

        public async Task<List<RolePermissionMap>> GetAllRolePermissionMapsAsync()
        {
            const string cacheKey = "RBAC-RolePermissionMaps-All";
            var list = _cache.Get<List<RolePermissionMap>>(cacheKey);
            if (list != null)
                return list;

            list = await _repo.GetAllRolePermissionMapsAsync();
            _cache.Set(cacheKey, list, _cacheExpiryMinutes);
            return list;
        }

        public async Task<List<RbacApplication>> GetAllApplicationsAsync()
        {
            const string cacheKey = "RBAC-Apps-All";
            var list = _cache.Get<List<RbacApplication>>(cacheKey);
            if (list != null)
                return list;

            list = await _repo.GetAllApplicationsAsync();
            _cache.Set(cacheKey, list, _cacheExpiryMinutes);
            return list;
        }

        public async Task<List<InsHubRoute>> GetAllRoutesAsync()
        {
            const string cacheKey = "RBAC-Routes-All";
            var list = _cache.Get<List<InsHubRoute>>(cacheKey);
            if (list != null)
                return list;

            list = await _repo.GetAllRoutesAsync();
            _cache.Set(cacheKey, list, _cacheExpiryMinutes);
            return list;
        }
    }
}
