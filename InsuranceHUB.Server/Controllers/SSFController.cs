using InsuranceHub.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace InsuranceHub.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class SSFController : ControllerBase
    {
        private readonly ISSFService _ssfService;

        public SSFController(ISSFService ssfService)
        {
            _ssfService = ssfService;
        }

        [HttpGet("getpatientdetails")]
        public async Task<IActionResult> GetPatientDetails([FromQuery] string patientNo)
        {
            if (string.IsNullOrWhiteSpace(patientNo))
                return BadRequest("patientNo is required.");

            var result = await _ssfService.GetPatientDetailsAsync(patientNo);
            return Ok(result);
        }

        [HttpGet("checkeligibility")]
        public async Task<IActionResult> GetEligibility([FromQuery] string patientNo, [FromQuery] string visitDate)
        {
            if (string.IsNullOrWhiteSpace(patientNo) || string.IsNullOrWhiteSpace(visitDate))
                return BadRequest("patientNo and visitDate are required.");

            var result = await _ssfService.GetPatientEligibilityAsync(patientNo, visitDate);
            return Ok(result);
        }
    }
}
