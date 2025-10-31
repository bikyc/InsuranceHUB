using InsuranceHub.Domain.Interfaces;
using InsuranceHub.Domain.Models.RBAC;
using InsuranceHub.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace InsuranceHub.Infrastructure.Persistence.Repository
{
    public class RbacRepository : IRbacRepository
    {
        private readonly RbacDbContext _db;

        public RbacRepository(RbacDbContext db) { _db = db; }

        public async Task<List<RbacPermission>> GetAllPermissionsAsync() => await _db.Permissions.ToListAsync();
        public async Task<List<RbacRole>> GetAllRolesAsync() => await _db.Roles.ToListAsync();
        public async Task<List<UserRoleMap>> GetAllUserRoleMapsAsync() => await _db.UserRoleMaps.ToListAsync();
        public async Task<List<RolePermissionMap>> GetAllRolePermissionMapsAsync() => await _db.RolePermissionMaps.ToListAsync();
        public async Task<List<RbacApplication>> GetAllApplicationsAsync() => await _db.Applications.ToListAsync();
        public async Task<List<InsHubRoute>> GetAllRoutesAsync() => await _db.Routes.ToListAsync();

        public List<InsHubRoute> GetRoutesForUser(int userId, bool getHierarchy)
        {
            var allRoutes = (
                from urm in _db.UserRoleMaps
                join rpm in _db.RolePermissionMaps on urm.RoleId equals rpm.RoleId
                join route in _db.Routes on rpm.PermissionId equals route.PermissionId
                where urm.UserId == userId && route.IsActive == true
                orderby route.DisplaySeq
                select route
            ).Distinct().ToList();

            if (getHierarchy)
            {
                var parentRoutes = allRoutes.Where(r => r.ParentRouteId == null && r.DefaultShow == true).ToList();

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
            var children = allRoutes.Where(r => r.ParentRouteId == parent.RouteId).OrderBy(r => r.DisplaySeq).ToList();

            foreach (var child in children)
            {
                child.ChildRoutes = GetChildRoutesHierarchy(allRoutes, child);
            }

            return children;
        }


    }

}
