using InsuranceHub.Api.Controllers;
using InsuranceHub.Application.Interfaces;
using InsuranceHub.Infrastructure.Persistence;
using Microsoft.AspNetCore.Mvc;

namespace InsuranceHub.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClaimManagementController : CommonController
    {
        private readonly IClaimManagementService _claimManagementService;
        private readonly ClaimManagementDbContext _claimManagementDbContext;

        public ClaimManagementController(
            IClaimManagementService claimManagementService,
            ClaimManagementDbContext claimManagementDbContext)
        {
            _claimManagementService = claimManagementService;
            _claimManagementDbContext = claimManagementDbContext;
        }

        [HttpGet("InsuranceApplicableCreditOrganizations")]
        public IActionResult InsuranceApplicableCreditOrganizations()
        {
            Func<object> func = () => _claimManagementService.GetInsuranceApplicableCreditOrganizations();

            return InvokeHttpGetFunction(func);
        }
    }
}
