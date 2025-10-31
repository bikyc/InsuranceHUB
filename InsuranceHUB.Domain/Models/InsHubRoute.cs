using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InsuranceHub.Domain.Models
{
    public class InsHubRoute
    {
        [Key]
        public int RouteId { get; set; }
        public string UrlFullPath { get; set; }
        public string DisplayName { get; set; }
        public int? PermissionId { get; set; }
        public int? ParentRouteId { get; set; }
        public bool? DefaultShow { get; set; }
        public string RouterLink { get; set; }
        public bool IsActive { get; set; }
        public bool? IsSecondaryNavInDropdown { get; set; }
        [NotMapped]
        public List<InsHubRoute> ChildRoutes { get; set; }

        public string Css { get; set; }
        public int? DisplaySeq { get; set; }
        [NotMapped]
        public int? ChildRoutesDefaultShowCount { get; set; }
        public string RouteDescription { get; set; }

    }
}
