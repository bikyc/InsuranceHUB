using InsuranceHub.Api.Controllers;
using InsuranceHub.Application.Interfaces;
using InsuranceHub.Application.Services;
using InsuranceHub.Domain.Models.RBAC;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace InsuranceHub.Server.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class SecurityController : CommonController
    {
        private readonly ISecurityService _securityService;

        public SecurityController(ISecurityService securityService)
        {
            _securityService = securityService;
        }

        [HttpGet("NavigationRoutes")]
        public IActionResult GetNavigationRouteList()
        {

            Func<object> func = () => _securityService.NavigationRouteList();
            return InvokeHttpGetFunction(func);
    
        }
    }
}
