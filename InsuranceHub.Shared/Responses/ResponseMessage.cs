using InsuranceHub.Shared.Enums;

namespace InsuranceHub.Shared.Responses
{
    public class ResponseMessage<T>
    {
        public ResponseStatus Status { get; set; }
        public ResponseMessageStatus MessageStatus { get; set; }
        public string Message { get; set; }

        public T Data { get; set; }

        public static ResponseMessage<T> Ok(T data, string message = "Success")
        {
            return new ResponseMessage<T>
            {
                Status = ResponseStatus.Success,
                MessageStatus = ResponseMessageStatus.Ok,
                Message = message,
                Data = data
            };
        }

        public static ResponseMessage<T> Failed(string message, ResponseStatus status = ResponseStatus.Failed, T data = default)
        {
            return new ResponseMessage<T>
            {
                Status = status,
                MessageStatus = ResponseMessageStatus.Failed,
                Message = message,
                Data = data
            };
        }

    }
}
