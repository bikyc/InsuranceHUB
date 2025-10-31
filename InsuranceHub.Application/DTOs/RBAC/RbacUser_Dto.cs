using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InsuranceHub.Domain.Models.RBAC
{
    public partial class RbacUser_Dto : ICloneable
    {
        public int UserId { get; set; }
        public int EmployeeId { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public int? ModifiedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public List<RbacRole_Dto> Roles { get; set; }

        public bool? IsActive { get; set; }

        public bool? NeedsPasswordUpdate { get; set; }

        public RbacUser_Dto()
        {
            Roles = new List<RbacRole_Dto>();
        }

        public object Clone()
        {
            return this.MemberwiseClone();
        }

        public EmployeeModel Employee { get; set; }
        public int? LandingPageRouteId { get; set; }
    }
}
