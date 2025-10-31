using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InsuranceHub.Shared.Constants
{
    public static class CacheKeys
    {
        public static string UserPermissions(Guid userId) => $"RBAC-UserPermissions-UserId-{userId}";
    }
}
