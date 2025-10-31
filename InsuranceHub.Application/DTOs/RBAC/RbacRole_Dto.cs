using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InsuranceHub.Domain.Models.RBAC
{
    public partial class RbacRole_Dto
    {
        public int RoleId { get; set; }
        public string RoleName { get; set; }
        public string RoleDescription { get; set; }
        public string RoleType { get; set; }
        public int? ApplicationId { get; set; }
        public bool IsSysAdmin { get; set; }
        public bool IsActive { get; set; }
        public int? RolePriority { get; set; }
        [ForeignKey("Route")]
        public int? DefaultRouteId { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public int? ModifiedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }

        public RbacApplication_Dto Application { get; set; }
        public List<RbacPermission_Dto> Permissions { get; set; }
        public List<RbacUser_Dto> Users { get; set; }
        public InsHubRoute_Dto Route { get; set; }

        public RbacRole_Dto()
        {
            Permissions = new List<RbacPermission_Dto>();
            Users = new List<RbacUser_Dto>();
        }
    }
}
