using InsuranceHub.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InsuranceHub.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class SSFController : CommonController
    {
        private readonly ISSFService _ssfService;

        public SSFController(ISSFService ssfService)
        {
            _ssfService = ssfService;
        }

        [HttpGet("checkeligibility")]
        public async Task<IActionResult> GetEligibility([FromQuery] string patientNo)
        {
            return await InvokeHttpFunction(() => _ssfService.GetPatientEligibilityAsync(patientNo));
        }

        [HttpGet("getpatientdetails")]
        public async Task<IActionResult> GetPatientDetails([FromQuery] string patientNo, string visitDate)
        {
            return await InvokeHttpFunction(() => _ssfService.GetPatientDetailsAsync(patientNo, visitDate));
        }
    }
}