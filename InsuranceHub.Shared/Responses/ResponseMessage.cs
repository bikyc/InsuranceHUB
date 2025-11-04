using InsuranceHub.Shared.Enums;

public class ResponseMessage<T>
{
    // Status will be string, either "Ok" or "Failed"
    public string Status { get; set; }
    public string Message { get; set; }
    public T Result { get; set; }

    public static ResponseMessage<T> Ok(T result, string message = "Success")
    {
        return new ResponseMessage<T>
        {
            Status = ENUM_ResponseStatus.Ok,    
            Message = message,
            Result = result
        };
    }

    public static ResponseMessage<T> Failed(string message, T result = default)
    {
        return new ResponseMessage<T>
        {
            Status = ENUM_ResponseStatus.Failed,
            Message = message,
            Result = result
        };
    }
}
