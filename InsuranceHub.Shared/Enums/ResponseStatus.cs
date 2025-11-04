namespace InsuranceHub.Shared.Enums
{
    // Numeric HTTP-like status codes
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

    // String-based business-level status for frontend
    public static class ENUM_ResponseStatus
    {
        public static readonly string Ok = "Ok";
        public static readonly string Failed = "Failed";
    }
}
