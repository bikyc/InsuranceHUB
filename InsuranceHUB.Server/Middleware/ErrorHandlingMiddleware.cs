using InsuranceHub.Shared.Enums;
using InsuranceHub.Shared.Responses;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace InsuranceHub.Api.Middleware
{
    public class ErrorHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ErrorHandlingMiddleware> _logger;
        private readonly IWebHostEnvironment _env;

        public ErrorHandlingMiddleware(RequestDelegate next, ILogger<ErrorHandlingMiddleware> logger, IWebHostEnvironment env)
        {
            _next = next;
            _logger = logger;
            _env = env;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "❌ Unhandled exception occurred in {Path}", context.Request.Path);

                var status = ResponseStatus.InternalServerError;
                string message = "An unexpected error occurred.";
                object? errorDetails = null;

                switch (ex)
                {
                    case ArgumentException argEx:
                        status = ResponseStatus.BadRequest;
                        message = argEx.Message;
                        break;

                    case KeyNotFoundException keyEx:
                        status = ResponseStatus.NotFound;
                        message = keyEx.Message;
                        break;

                    case UnauthorizedAccessException:
                        status = ResponseStatus.Unauthorized;
                        message = "Unauthorized access.";
                        break;

                    case InvalidOperationException opEx:
                        status = ResponseStatus.BadRequest;
                        message = opEx.Message;
                        break;
                }

                // Include detailed exception info only in development
                if (_env.IsDevelopment())
                {
                    errorDetails = new
                    {
                        ExceptionType = ex.GetType().Name,
                        ex.Message,
                        ex.StackTrace,
                        InnerException = ex.InnerException?.ToString()
                    };
                    message = $"{message} (Detailed: {ex.Message})";
                }

                // Create ResponseMessage using the new Failed() overload that accepts data
                var response = ResponseMessage<object>.Failed(
                    message: message,
                    status: status,
                    data: errorDetails
                );

                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int)status;
                await context.Response.WriteAsJsonAsync(response);
            }
        }
    }
}
