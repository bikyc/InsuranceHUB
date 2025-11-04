using Newtonsoft.Json;

namespace InsuranceHub.Api.Helpers
{
    public static class ApiResponseSerializer
    {
        public static string SerializeResponse<T>(ResponseMessage<T> response)
        {
            return JsonConvert.SerializeObject(response, Newtonsoft.Json.Formatting.Indented);
        }
    }
}
