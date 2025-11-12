using InsuranceHub.Domain.Interfaces;
using InsuranceHub.Domain.Models.RBAC;
using InsuranceHub.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace InsuranceHub.Infrastructure.Persistence.Repository
{
    public class RbacRepository : IRbacRepository
    {
        private readonly RbacDbContext _db;

        public RbacRepository(RbacDbContext db)
        {
            _db = db;
        }

        public async Task<List<RbacPermission>> GetAllPermissionsAsync()
        {
            return await _db.Permissions
                .Select(p => new RbacPermission
                {
                    PermissionId = p.PermissionId,
                    PermissionName = p.PermissionName ?? string.Empty,
                    Description = p.Description ?? string.Empty,
                    ApplicationId = p.ApplicationId,
                    CreatedBy = p.CreatedBy,
                    CreatedOn = p.CreatedOn,
                    ModifiedBy = p.ModifiedBy,
                    ModifiedOn = p.ModifiedOn,
                    IsActive = p.IsActive,
                    Application = p.Application != null
                        ? new RbacApplication
                        {
                            ApplicationId = p.Application.ApplicationId,
                            ApplicationCode = p.Application.ApplicationCode ?? string.Empty,
                            ApplicationName = p.Application.ApplicationName ?? string.Empty,
                            Description = p.Application.Description ?? string.Empty,
                            IsActive = p.Application.IsActive,
                            CreatedBy = p.Application.CreatedBy,
                            CreatedOn = p.Application.CreatedOn,
                            ModifiedBy = p.Application.ModifiedBy,
                            ModifiedOn = p.Application.ModifiedOn
                        }
                        : null,
                    Roles = new List<RbacRole>() // optional, leave empty to avoid lazy loading issues
                }).ToListAsync();
        }

        public async Task<List<RbacRole>> GetAllRolesAsync()
        {
            return await _db.Roles
                .Select(r => new RbacRole
                {
                    RoleId = r.RoleId,
                    RoleName = r.RoleName ?? string.Empty,
                    RoleDescription = r.RoleDescription ?? string.Empty,
                    RoleType = r.RoleType ?? string.Empty,
                    ApplicationId = r.ApplicationId,
                    IsSysAdmin = r.IsSysAdmin,
                    IsActive = r.IsActive,
                    RolePriority = r.RolePriority,
                    DefaultRouteId = r.DefaultRouteId,
                    CreatedBy = r.CreatedBy,
                    CreatedOn = r.CreatedOn,
                    ModifiedBy = r.ModifiedBy,
                    ModifiedOn = r.ModifiedOn,
                    Application = null,
                    Permissions = new List<RbacPermission>(),
                    Users = new List<RbacUser>(),
                    Route = null
                }).ToListAsync();
        }

        public async Task<List<UserRoleMap>> GetAllUserRoleMapsAsync()
        {
            return await _db.UserRoleMaps
                .Select(urm => new UserRoleMap
                {
                    UserRoleMapId = urm.UserRoleMapId,
                    UserId = urm.UserId,
                    RoleId = urm.RoleId,
                    StartDate = urm.StartDate,
                    EndDate = urm.EndDate,
                    CreatedBy = urm.CreatedBy,
                    CreatedOn = urm.CreatedOn,
                    ModifiedBy = urm.ModifiedBy,
                    ModifiedOn = urm.ModifiedOn,
                    IsActive = urm.IsActive,
                    User = null,
                    Role = null
                }).ToListAsync();
        }

        public async Task<List<RolePermissionMap>> GetAllRolePermissionMapsAsync()
        {
            return await _db.RolePermissionMaps
                .Select(rpm => new RolePermissionMap
                {
                    RolePermissionMapId = rpm.RolePermissionMapId,
                    RoleId = rpm.RoleId,
                    PermissionId = rpm.PermissionId,
                    CreatedBy = rpm.CreatedBy,
                    CreatedOn = rpm.CreatedOn,
                    ModifiedBy = rpm.ModifiedBy,
                    ModifiedOn = rpm.ModifiedOn,
                    IsActive = rpm.IsActive,
                    Permission = null,
                    Role = null
                }).ToListAsync();
        }

        public async Task<List<RbacApplication>> GetAllApplicationsAsync()
        {
            return await _db.Applications
                .Select(a => new RbacApplication
                {
                    ApplicationId = a.ApplicationId,
                    ApplicationCode = a.ApplicationCode ?? string.Empty,
                    ApplicationName = a.ApplicationName ?? string.Empty,
                    Description = a.Description ?? string.Empty,
                    IsActive = a.IsActive,
                    CreatedBy = a.CreatedBy,
                    CreatedOn = a.CreatedOn,
                    ModifiedBy = a.ModifiedBy,
                    ModifiedOn = a.ModifiedOn,
                    Roles = new List<RbacRole>(),
                    Permissions = new List<RbacPermission>()
                }).ToListAsync();
        }


        // Safe projection to avoid SqlNullValueException
        public async Task<List<InsHubRoute>> GetAllRoutesAsync()
        {
            return await _db.Routes
                .Select(r => new InsHubRoute
                {
                    RouteId = r.RouteId,
                    UrlFullPath = r.UrlFullPath ?? string.Empty,
                    DisplayName = r.DisplayName ?? string.Empty,
                    PermissionId = r.PermissionId,
                    ParentRouteId = r.ParentRouteId,
                    DefaultShow = r.DefaultShow ?? false,
                    RouterLink = r.RouterLink ?? string.Empty,
                    IsActive = r.IsActive,
                    IsSecondaryNavInDropdown = r.IsSecondaryNavInDropdown ?? false,
                    Css = r.Css ?? string.Empty,
                    DisplaySeq = r.DisplaySeq ?? 0,
                    RouteDescription = r.RouteDescription ?? string.Empty,
                    ChildRoutes = new List<InsHubRoute>()
                })
                .ToListAsync();
        }

        public List<InsHubRoute> GetRoutesForUser(int userId, bool getHierarchy)
        {
            var allRoutes = (
                from urm in _db.UserRoleMaps
                join rpm in _db.RolePermissionMaps on urm.RoleId equals rpm.RoleId
                join route in _db.Routes on rpm.PermissionId equals route.PermissionId
                where urm.UserId == userId && route.IsActive == true
                orderby route.DisplaySeq
                select new InsHubRoute
                {
                    RouteId = route.RouteId,
                    UrlFullPath = route.UrlFullPath ?? string.Empty,
                    DisplayName = route.DisplayName ?? string.Empty,
                    PermissionId = route.PermissionId,
                    ParentRouteId = route.ParentRouteId,
                    DefaultShow = route.DefaultShow ?? false,
                    RouterLink = route.RouterLink ?? string.Empty,
                    IsActive = route.IsActive,
                    IsSecondaryNavInDropdown = route.IsSecondaryNavInDropdown ?? false,
                    Css = route.Css ?? string.Empty,
                    DisplaySeq = route.DisplaySeq ?? 0,
                    RouteDescription = route.RouteDescription ?? string.Empty,
                    ChildRoutes = new List<InsHubRoute>()
                }
            ).Distinct().ToList();

            if (getHierarchy)
            {
                var parentRoutes = allRoutes
                    .Where(r => r.ParentRouteId == null && r.DefaultShow == true)
                    .ToList();

                foreach (var parent in parentRoutes)
                {
                    parent.ChildRoutes = GetChildRoutesHierarchy(allRoutes, parent);
                }

                return parentRoutes;
            }

            return allRoutes;
        }

        private List<InsHubRoute> GetChildRoutesHierarchy(List<InsHubRoute> allRoutes, InsHubRoute parent)
        {
            var children = allRoutes
                .Where(r => r.ParentRouteId == parent.RouteId)
                .OrderBy(r => r.DisplaySeq)
                .ToList();

            foreach (var child in children)
            {
                child.ChildRoutes = GetChildRoutesHierarchy(allRoutes, child);
            }

            return children;
        }

        public async Task<RbacUser?> GetUserByIdAsync(int userId)
        {
            return await _db.Users.FirstOrDefaultAsync(u => u.UserId == userId);
        }
    }
}
