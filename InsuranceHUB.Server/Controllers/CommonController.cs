using InsuranceHub.Shared.Enums;
using Microsoft.AspNetCore.Mvc;

namespace InsuranceHub.Api.Controllers
{
    [ApiController]
    public abstract class CommonController : ControllerBase
    {
        protected IActionResult MapResponse<T>(ResponseMessage<T> response)
        {
            return response.Status switch
            {
                var s when s == ENUM_ResponseStatus.Ok => Ok(response),
                var s when s == ENUM_ResponseStatus.Failed => BadRequest(response),
                _ => StatusCode(500, response) // fallback
            };
        }


        protected IActionResult InvokeHttpGetFunction<T>(Func<T> func)
        {
            try
            {
                var data = func();
                var response = ResponseMessage<T>.Ok(data);
                return MapResponse(response);
            }
            catch (Exception ex)
            {
                var response = ResponseMessage<T>.Failed(ex.Message);
                return MapResponse(response);
            }
        }

        protected async Task<IActionResult> InvokeHttpGetFunctionAsync<T>(Func<Task<T>> func)
        {
            try
            {
                var data = await func();
                var response = ResponseMessage<T>.Ok(data);
                return MapResponse(response);
            }
            catch (Exception ex)
            {
                var response = ResponseMessage<T>.Failed(ex.Message);
                return MapResponse(response);
            }
        }

        // Later, you can add similar methods for POST/PUT/DELETE
        // e.g., InvokeHttpPostFunctionAsync, InvokeHttpPutFunctionAsync, etc.
    }
}
