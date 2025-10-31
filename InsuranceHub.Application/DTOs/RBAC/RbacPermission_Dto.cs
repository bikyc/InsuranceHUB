using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InsuranceHub.Domain.Models.RBAC
{
    public partial class RbacPermission_Dto
    {
        public int PermissionId { get; set; }
        public string PermissionName { get; set; }
        public string Description { get; set; }
        public int? ApplicationId { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public int? ModifiedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public bool IsActive { get; set; }
        public RbacApplication_Dto Application { get; set; }
        public List<RbacRole_Dto> Roles { get; set; }
        public RbacPermission_Dto()
        {
            Roles = new List<RbacRole_Dto>();
        }
    }
}