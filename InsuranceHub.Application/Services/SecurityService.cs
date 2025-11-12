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
        private readonly IRbacService _iRbacService;

        public SecurityService(IRbacRepository rbacRepository, IRbacService iRbacService)
        {
            _rbacRepository = rbacRepository;
            _iRbacService = iRbacService;
        }

        // Main clean method
        public async Task<ResponseMessage<List<InsHubRoute>>> GetNavigationRoutesForUserAsync(int userId)
        {
            return await _iRbacService.GetNavigationRoutesForUserAsync(userId);

            //var user = await _rbac.GetUserByIdAsync(userId);
            //if (user == null)
            //{
            //    return new ResponseMessage<List<InsHubRoute>>
            //    {
            //        Status = ENUM_ResponseStatus.Failed,
            //        Message = "Invalid or inactive user",
            //        Result = new List<InsHubRoute>()
            //    };
            //}

            //var routes = _rbacRepository.GetRoutesForUser(userId, getHierarchy: false);

            //return new ResponseMessage<List<InsHubRoute>>
            //{
            //    Status = ENUM_ResponseStatus.Ok,
            //    Result = routes,
            //    Message = "Routes fetched successfully"
            //};
        }

        // Get current user from claims
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
