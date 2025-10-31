using InsuranceHub.Application.Interfaces;
using InsuranceHub.Domain.Interfaces;
using InsuranceHub.Domain.Models;
using InsuranceHub.Domain.Models.RBAC;
using InsuranceHub.Shared.Enums;
using InsuranceHub.Shared.Responses;
using System.Collections.Generic;
using System.Threading.Tasks;

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
                Status = ResponseStatus.Success,
                Data = routeList,
                Message = "Routes fetched successfully"
            };

            return await Task.FromResult(response);
        }
    }
}
