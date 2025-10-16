using AutoMapper;
using InsuranceHub.Application.Interfaces;
using InsuranceHub.Domain.Interfaces;
using InsuranceHub.Domain.Models.SSF;
using InsuranceHub.Shared.Responses;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using System.Text;

namespace InsuranceHub.Application.Services
{
    public class SSFService : ISSFService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly HttpClient _httpClient;

        public SSFService(IUnitOfWork unitOfWork, IMapper mapper, IHttpClientFactory httpClientFactory)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _httpClient = httpClientFactory.CreateClient();
        }
        //public async Task<ResponseMessage<SSFPatientDetails>> GetPatientDetailsAsync(string nshiNumber,)

        public async Task<ResponseMessage<SSFPatientDetails>> GetPatientDetailsAsync(string patientNo)
        {
            if (string.IsNullOrEmpty(patientNo))
                return ResponseMessage<SSFPatientDetails>.Failed("Patient number is required");

            try
            {
                var request = new EligibilityRequest
                {
                    resourceType = "CoverageEligibilityRequest",
                    patient = new EligibilityPatientData { reference = $"Patient/{patientNo}" },
                    extension = new List<EligibilityExtension>
                    {
                        new EligibilityExtension { url = "visitDate"}
                    }
                };

                var ssfCred = await GetSSFCredentialsAsync();
                ConfigureHttpClient(_httpClient, ssfCred);

                var content = new StringContent(JsonConvert.SerializeObject(request), Encoding.UTF8, "application/json");
                var response = await _httpClient.PostAsync("CoverageEligibilityRequest/", content);
                var resultJson = await response.Content.ReadAsStringAsync();

                if (!response.IsSuccessStatusCode)
                    return ResponseMessage<SSFPatientDetails>.Failed($"SSF API call failed: {resultJson}");

                var data = JsonConvert.DeserializeObject<SSFPatientDetails>(resultJson);
                return ResponseMessage<SSFPatientDetails>.Ok(data, "Patient details fetched successfully");
            }
            catch (Exception ex)
            {
                return ResponseMessage<SSFPatientDetails>.Failed($"Error fetching SSF patient details: {ex.Message}");
            }
        }

        public Task<ResponseMessage<EligibilityResponse>> GetPatientEligibilityAsync(string patientNo, string visitDate)
        {
            throw new NotImplementedException();
        }

        private async Task<SSFCredentials> GetSSFCredentialsAsync()
        {
            var param = await _unitOfWork.Parameters.GetParameter("SSFConfiguration", "SSF");
            if (param == null)
                throw new Exception("SSF Configuration not found");

            var cred = JsonConvert.DeserializeObject<SSFCredentials>(param.ParameterValue);
            return cred ?? throw new Exception("SSF credentials deserialization failed");
        }

        private static void ConfigureHttpClient(HttpClient client, SSFCredentials cred)
        {
            client.DefaultRequestHeaders.Clear();
            var authValue = Convert.ToBase64String(Encoding.GetEncoding("ISO-8859-1").GetBytes($"{cred.SSFUsername}:{cred.SSFPassword}"));
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", authValue);
            client.DefaultRequestHeaders.Add(cred.SSFRemotekey, cred.SSFRemoteValue);
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            client.BaseAddress = new Uri(cred.SSFurl);
        }

    }
}
