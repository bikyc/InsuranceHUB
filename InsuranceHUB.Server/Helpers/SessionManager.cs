using InsuranceHub.Domain.Models.RBAC;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace InsuranceHub.Server.Helpers
{
    public static class SessionManager
    {
        private const string USER_KEY = "currentuser";
        private const string PERMISSIONS_KEY = "validpermissionlist";
        private const string ROLES_KEY = "user-roles";

        public static void SetCurrentUser(this ISession session, RbacUser user)
        {
            session.SetString(USER_KEY, JsonConvert.SerializeObject(user));
        }

        public static RbacUser? GetCurrentUser(this ISession session)
        {
            var json = session.GetString(USER_KEY);
            if (string.IsNullOrEmpty(json))
                return null;

            return JsonConvert.DeserializeObject<RbacUser>(json);
        }

        public static void SetPermissions(this ISession session, List<RbacPermission> permissions)
        {
            session.SetString(PERMISSIONS_KEY, JsonConvert.SerializeObject(permissions));
        }

        public static List<RbacPermission> GetPermissions(this ISession session)
        {
            var json = session.GetString(PERMISSIONS_KEY);
            if (string.IsNullOrEmpty(json))
                return new List<RbacPermission>();

            return JsonConvert.DeserializeObject<List<RbacPermission>>(json);
        }

        public static void SetRoles(this ISession session, List<RbacRole> roles)
        {
            session.SetString(ROLES_KEY, JsonConvert.SerializeObject(roles));
        }

        public static List<RbacRole> GetRoles(this ISession session)
        {
            var json = session.GetString(ROLES_KEY);
            if (string.IsNullOrEmpty(json))
                return new List<RbacRole>();

            return JsonConvert.DeserializeObject<List<RbacRole>>(json);
        }
    }
}
