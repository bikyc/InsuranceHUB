using InsuranceHub.Application.Interfaces;
using InsuranceHub.Domain.Interfaces;
using InsuranceHub.Domain.Models;
using InsuranceHub.Domain.Models.RBAC;
using InsuranceHub.Shared.Enums;
using Newtonsoft.Json;
using System.Security.Claims;

namespace InsuranceHub.Application.Services
{
    public class SecurityService : ISecurityService
    {
        private readonly IRbacRepository _rbacRepository;

        public SecurityService(IRbacRepository rbacRepository)
        {
            _rbacRepository = rbacRepository;
        }

        public async Task<ResponseMessage<List<InsHubRoute>>> NavigationRouteList(RbacUser currentUser)
        {
            // Fetch routes from RBAC repository
            var routeList = _rbacRepository.GetRoutesForUser(currentUser.UserId, getHierarchy: false);

            var response = new ResponseMessage<List<InsHubRoute>>
            {
                Status = ENUM_ResponseStatus.Ok,
                Result = routeList,
                Message = "Routes fetched successfully"
            };

            return await Task.FromResult(response);
        }
        public RbacUser? GetCurrentUser(ClaimsPrincipal user)
        {
            var claim = user.Claims.FirstOrDefault(c => c.Type == "currentUser");
            if (claim == null)
                return null;

            try
            {
                return JsonConvert.DeserializeObject<RbacUser>(claim.Value);
            }
            catch
            {
                return null;
            }
        }

    }
}
