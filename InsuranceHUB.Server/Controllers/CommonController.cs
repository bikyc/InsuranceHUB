using Microsoft.AspNetCore.Mvc;
using InsuranceHub.Shared.Responses;
using InsuranceHub.Api.Helpers;
using InsuranceHub.Shared.Enums;

namespace InsuranceHub.Api.Controllers
{
    [ApiController]
    public class CommonController : ControllerBase
    {
        protected IActionResult MapResponseStatus<T>(ResponseMessage<T> response)
        {
            var serialized = ApiResponseSerializer.SerializeResponse(response);

            return response.Status switch
            {
                ResponseStatus.Success => Ok(serialized),
                ResponseStatus.BadRequest => BadRequest(serialized),
                ResponseStatus.NotFound => NotFound(serialized),
                ResponseStatus.InternalServerError => StatusCode(500, serialized),
                _ => StatusCode(500, serialized)
            };
        }

        // Async
        protected async Task<IActionResult> InvokeHttpFunction<T>(Func<Task<ResponseMessage<T>>> func)
        {
            try
            {
                var response = await func();
                return MapResponseStatus(response);
            }
            catch (Exception ex)
            {
                var errorResponse = ResponseMessage<T>.Failed(
                    ex.Message, ResponseStatus.InternalServerError);
                return MapResponseStatus(errorResponse);
            }
        }

        // Sync
        protected IActionResult InvokeHttpFunction<T>(Func<ResponseMessage<T>> func)
        {
            try
            {
                var response = func();
                return MapResponseStatus(response);
            }
            catch (Exception ex)
            {
                var errorResponse = ResponseMessage<T>.Failed(
                    ex.Message, ResponseStatus.InternalServerError);
                return MapResponseStatus(errorResponse);
            }
        }
    }
}
