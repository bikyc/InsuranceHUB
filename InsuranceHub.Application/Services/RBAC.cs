using InsuranceHub.Application.Interfaces;
using InsuranceHub.Domain.Interfaces;
using InsuranceHub.Domain.Models;
using InsuranceHub.Domain.Models.RBAC;
using InsuranceHub.Shared.Enums;

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
            _cacheExpiryMinutes = cacheExpiryMinutes > 0 ? cacheExpiryMinutes : 60;
        }

        // Get navigation routes for a user
        public async Task<ResponseMessage<List<InsHubRoute>>> GetNavigationRoutesForUserAsync(int userId, bool getHierarchy = true)
        {
            var user = await _repo.GetUserByIdAsync(userId);
            if (user == null)
                return new ResponseMessage<List<InsHubRoute>>
                {
                    Status = ENUM_ResponseStatus.Failed,
                    Result = new List<InsHubRoute>(),
                    Message = "Invalid or inactive user"
                };

            var routes = await GetRoutesForUserAsync(userId, getHierarchy);
            return new ResponseMessage<List<InsHubRoute>>
            {
                Status = ENUM_ResponseStatus.Ok,
                Result = routes,
                Message = "Routes fetched successfully"
            };
        }

        // Fetch routes filtered by user permissions
        public async Task<List<InsHubRoute>> GetRoutesForUserAsync(int userId, bool getHierarchy)
        {
            // 1️⃣ Fetch all routes
            var allRoutes = await GetAllRoutesAsync();

            // 2️⃣ Find the parent "ClaimManagement" route
            var parentRoute = allRoutes.FirstOrDefault(r =>
                r.UrlFullPath == "ClaimManagement" || r.RouterLink == "ClaimManagement");

            if (parentRoute == null)
                return new List<InsHubRoute>();

            // 3️⃣ Filter only child routes of ClaimManagement (exclude parent)
            var filteredRoutes = allRoutes
                .Where(r => r.ParentRouteId == parentRoute.RouteId)
                .ToList();

            // 4️⃣ Get user permissions
            var userPerms = await GetUserAllPermissionsAsync(userId);

            // 5️⃣ Filter routes based on user permissions
            var matchedRoutes = filteredRoutes
                .Where(r => userPerms.Any(p => p.PermissionId == r.PermissionId))
                .OrderBy(r => r.DisplaySeq)
                .ToList();

            if (!getHierarchy)
                return matchedRoutes;

            // 6️⃣ Build child route hierarchy (only within filtered child set)
            foreach (var parent in matchedRoutes)
            {
                parent.ChildRoutes = GetChildRouteHierarchy(matchedRoutes, parent);
            }

            return matchedRoutes;
        }



        private List<InsHubRoute> GetChildRouteHierarchy(List<InsHubRoute> routes, InsHubRoute parent)
        {
            var children = routes
                .Where(r => r.ParentRouteId == parent.RouteId)
                .OrderBy(r => r.DisplaySeq)
                .ToList();

            foreach (var child in children)
                child.ChildRoutes = GetChildRouteHierarchy(routes, child);

            return children.Any() ? children : null;
        }

        // Get all permissions for a user (filtered by Claim Management app)
        public async Task<List<RbacPermission>> GetUserAllPermissionsAsync(int userId)
        {
            var cacheKey = $"RBAC-UserPermissions-{userId}";
            var permissions = _cache.Get<List<RbacPermission>>(cacheKey);
            if (permissions != null)
                return permissions;

            // 1️⃣ Fetch Claim Management app
            var allApps = await GetAllApplicationsAsync();
            var claimMgmtApp = allApps.FirstOrDefault(a =>
                a.ApplicationCode == "CLAIM-MGMT" || a.ApplicationName == "ClaimManagement");
            if (claimMgmtApp == null)
                return new List<RbacPermission>();

            // 2️⃣ Check if user is super admin
            var isSysAdmin = await UserIsSuperAdminAsync(userId);

            if (isSysAdmin)
            {
                // Super admin: get all Claim Management permissions
                permissions = (await GetAllPermissionsAsync())
                    .Where(p => p.ApplicationId == claimMgmtApp.ApplicationId)
                    .OrderBy(p => p.PermissionName)
                    .ToList();
            }
            else
            {
                // Regular user: get permissions via roles
                var allRoles = await GetAllRolesAsync();
                var allRolePermMaps = await GetAllRolePermissionMapsAsync();
                var allUserRoleMaps = await GetAllUserRoleMapsAsync();
                var allPerms = await GetAllPermissionsAsync();

                permissions = (from urole in allUserRoleMaps
                               where urole.UserId == userId && urole.IsActive
                               join role in allRoles on urole.RoleId equals role.RoleId
                               join rolePerm in allRolePermMaps on role.RoleId equals rolePerm.RoleId
                               join perm in allPerms on rolePerm.PermissionId equals perm.PermissionId
                               where rolePerm.IsActive && perm.ApplicationId == claimMgmtApp.ApplicationId
                               orderby perm.PermissionName
                               select perm)
                              .Distinct()
                              .ToList();
            }

            _cache.Set(cacheKey, permissions, _cacheExpiryMinutes);
            return permissions;
        }

        private async Task<bool> UserIsSuperAdminAsync(int userId)
        {
            var allRoles = await GetAllRolesAsync();
            var userRoles = await GetAllUserRoleMapsAsync();

            return (from ur in userRoles
                    where ur.UserId == userId
                    join role in allRoles on ur.RoleId equals role.RoleId
                    where role.IsSysAdmin
                    select role).Any();
        }

        // Cached fetch methods
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
            //list = list
            //    .Where(r => r.UrlFullPath == "ClaimManagement" || r.RouterLink == "ClaimManagement")
            //    .OrderBy(r => r.DisplaySeq)
            //    .ToList();

            _cache.Set(cacheKey, list, _cacheExpiryMinutes);
            return list;
        }
    }
}
