using InsuranceHub.Api.Controllers;
using InsuranceHub.Application.Interfaces;
using InsuranceHub.Server.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace InsuranceHub.Server.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class SecurityController : CommonController
    {
        private readonly ISecurityService _securityService;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public SecurityController(ISecurityService securityService, IHttpContextAccessor httpContextAccessor)
        {
            _securityService = securityService;
            _httpContextAccessor = httpContextAccessor;
        }
        //[HttpGet("NavigationRoutes")]
        //public async Task<IActionResult> GetNavigationRoutes()
        //{
        //    var session = _httpContextAccessor.HttpContext.Session;

        //    var currentUser = session.GetCurrentUser();
        //    if (currentUser == null)
        //        return Unauthorized("Session expired or user not found.");

        //    var response = await _securityService.GetNavigationRoutesForUserAsync(currentUser.UserId);
        //    return Ok(response);
        //}
        [HttpGet("NavigationRoutes")]
        public async Task<IActionResult> GetNavigationRoutes([FromQuery] int userId)
        {
            var response = await _securityService.GetNavigationRoutesForUserAsync(userId);
            return Ok(response);
        }

    }
}
