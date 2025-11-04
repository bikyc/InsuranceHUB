using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Options;
using System.Security.Claims;
using System.Text.Encodings.Web;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace InsuranceHub.Server.DependencyInjection
{
    public class UserIdAuthHandler : AuthenticationHandler<AuthenticationSchemeOptions>
    {
        public UserIdAuthHandler(
            IOptionsMonitor<AuthenticationSchemeOptions> options,
            ILoggerFactory logger,
            UrlEncoder encoder,
            ISystemClock clock)
            : base(options, logger, encoder, clock)
        { }

        protected override Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            if (Request.Query.TryGetValue("userId", out var userIdStr))
            {
                var claims = new[] { new Claim(ClaimTypes.NameIdentifier, userIdStr) };
                var identity = new ClaimsIdentity(claims, "UserIdAuth");
                var principal = new ClaimsPrincipal(identity);
                var ticket = new AuthenticationTicket(principal, "UserIdAuth");

                return Task.FromResult(AuthenticateResult.Success(ticket));
            }

            return Task.FromResult(AuthenticateResult.NoResult());
        }
    }
}
