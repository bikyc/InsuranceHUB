using InsuranceHub.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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
            return await InvokeHttpGetFunctionAsync(() => _hibService.GetPatientEligibilityAsync(nshiNumber));
        }

        [HttpGet("getpatientdetails")]
        public async Task<IActionResult> GetPatientDetails([FromQuery] string nshiNumber)
        {
            return await InvokeHttpGetFunctionAsync(() => _hibService.GetPatientDetailsAsync(nshiNumber));
        }
    }
}