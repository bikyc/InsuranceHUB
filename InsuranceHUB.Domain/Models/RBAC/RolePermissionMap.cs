using System.ComponentModel.DataAnnotations;

namespace InsuranceHub.Domain.Models.RBAC
{
    public class RolePermissionMap
    {
        [Key]
        public int RolePermissionMapId { get; set; }
        public int RoleId { get; set; }
        public int PermissionId { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public int? ModifiedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public bool IsActive { get; set; }
        public RbacPermission Permission { get; set; }
        public RbacRole Role { get; set; }
    }
}
