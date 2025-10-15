using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using InsuranceHub.Application.Interfaces;
using InsuranceHub.Shared.Responses;

namespace InsuranceHub.Api.Controllers
{
    [Authorize] 
    [ApiController]
    [Route("api/[controller]")]
    public class HIBController : CommonController
    {
        private readonly IHIBService _hibService;

        public HIBController(IHIBService hibService)
        {
            _hibService = hibService;
        }

        [HttpGet("checkeligibility")]
        public async Task<IActionResult> GetEligibility([FromQuery] string nshiNumber)
        {
            return await InvokeHttpFunction(() => _hibService.GetPatientEligibilityAsync(nshiNumber));
        }

        [HttpGet("getpatientdetails")]
        public async Task<IActionResult> GetPatientDetails([FromQuery] string nshiNumber)
        {
            return await InvokeHttpFunction(() => _hibService.GetPatientDetailsAsync(nshiNumber));
        }
    }
}