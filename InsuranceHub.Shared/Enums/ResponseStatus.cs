namespace InsuranceHub.Shared.Enums
{
    public enum ResponseStatus
    {
        Success = 200,
        BadRequest = 400,
        Unauthorized = 401,
        Forbidden = 403,
        NotFound = 404,
        InternalServerError = 500,
        Failed = 501,
    }

    public enum ResponseMessageStatus
    {
        Ok,
        Failed
    }
}
