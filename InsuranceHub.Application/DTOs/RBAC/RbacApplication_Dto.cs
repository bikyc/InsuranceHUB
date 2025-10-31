using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InsuranceHub.Domain.Models.RBAC
{
    public partial class RbacApplication_Dto
    {
        public int ApplicationId { get; set; }
        public string ApplicationCode { get; set; }
        public string ApplicationName { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public int? ModifiedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public List<RbacRole_Dto> Roles { get; set; }
        public List<RbacPermission_Dto> Permissions { get; set; }
    }
}
