using InsuranceHub.Application.Interfaces;
using InsuranceHub.Domain.Models.RBAC;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Text.Json;

namespace InsuranceHub.Server.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class SecurityController : ControllerBase
    {
        private readonly ISecurityService _securityService;

        public SecurityController(ISecurityService securityService)
        {
            _securityService = securityService;
        }

        [HttpGet("NavigationRoutes")]
        public IActionResult GetNavigationRouteList()
        {
            var currentUserClaim = User.Claims.FirstOrDefault(c => c.Type == "currentUser");
            if (currentUserClaim == null)
            {
                return Unauthorized("Invalid token: currentUser not found.");
            }
            // 2. Deserialize the JSON string into RbacUser
            RbacUser currentUser;
            try
            {
                currentUser = JsonSerializer.Deserialize<RbacUser>(currentUserClaim.Value);
            }
            catch
            {
                return Unauthorized("Invalid token: unable to deserialize currentUser.");
            }
            // 3. Fetch routes/permissions for this user
            var routes = _securityService.NavigationRouteList(currentUser);

            return Ok(routes);
        }
    }
}
