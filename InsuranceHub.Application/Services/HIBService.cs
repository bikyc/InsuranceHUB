using AutoMapper;
using InsuranceHub.Application.Interfaces;
using InsuranceHub.Domain.Interfaces;
using InsuranceHUB.Domain.Models.HIB;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using System.Text;
using static InsuranceHub.Application.Models.HIB.HIBApiResponses_Dto;

namespace InsuranceHub.Application.Services;

public class HIBService : IHIBService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    private readonly HttpClient _httpClient;

    public HIBService(
        IUnitOfWork unitOfWork,
        IMapper mapper,
        IHttpClientFactory httpClientFactory)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
        _httpClient = httpClientFactory.CreateClient();
    }

    public async Task<ResponseMessage<GetEligibilityApiResponse>> GetPatientEligibilityAsync(string nshiNumber)
    {
        if (string.IsNullOrEmpty(nshiNumber))
            return ResponseMessage<GetEligibilityApiResponse>.Failed("NSHI number is required");

        try
        {
            var (hibConfig, hibCredentials) = await GetHIBConfigAndCredentialsAsync();
            ConfigureHttpClient(_httpClient, hibConfig, hibCredentials);

            var eligibilityRequest = new EligibilityRequest
            {
                resourceType = "EligibilityRequest",
                patient = new Patient { reference = $"Patient/{nshiNumber}" }
            };

            var content = new StringContent(JsonConvert.SerializeObject(eligibilityRequest), Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync("EligibilityRequest/", content);
            var responseJson = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
                return ResponseMessage<GetEligibilityApiResponse>.Failed($"Eligibility request failed: {response.StatusCode}");

            var eligibilityResponse = JsonConvert.DeserializeObject<GetEligibilityApiResponse>(responseJson);
            return ResponseMessage<GetEligibilityApiResponse>.Ok(eligibilityResponse, "Eligibility request successful");
        }
        catch (Exception ex)
        {
            return ResponseMessage<GetEligibilityApiResponse>.Failed($"Eligibility request failed: {ex.Message}");
        }
    }

    public async Task<ResponseMessage<GetPatientDetailsAndEligibilityApiResponse>> GetPatientDetailsAsync(string nshiNumber)
    {
        if (string.IsNullOrEmpty(nshiNumber))
            return ResponseMessage<GetPatientDetailsAndEligibilityApiResponse>.Failed("NSHI number is required");

        try
        {
            var (hibConfig, hibCredentials) = await GetHIBConfigAndCredentialsAsync();
            ConfigureHttpClient(_httpClient, hibConfig, hibCredentials);

            var responseObj = new GetPatientDetailsAndEligibilityApiResponse();

            // Fetch patient details
            var patientResponse = await _httpClient.GetAsync($"Patient?identifier={nshiNumber}");
            if (!patientResponse.IsSuccessStatusCode)
                return ResponseMessage<GetPatientDetailsAndEligibilityApiResponse>.Failed("Failed to fetch patient details");

            var patientJson = await patientResponse.Content.ReadAsStringAsync();
            responseObj.PatientDetails = JsonConvert.DeserializeObject<GetPatientDetailsApiResponse>(patientJson);

            // Fetch eligibility
            var eligibilityRequest = new EligibilityRequest
            {
                resourceType = "EligibilityRequest",
                patient = new Patient { reference = $"Patient/{nshiNumber}" }
            };

            var content = new StringContent(JsonConvert.SerializeObject(eligibilityRequest), Encoding.UTF8, "application/json");
            var eligibilityResponse = await _httpClient.PostAsync("EligibilityRequest/", content);

            if (!eligibilityResponse.IsSuccessStatusCode)
                return ResponseMessage<GetPatientDetailsAndEligibilityApiResponse>.Failed("Eligibility request failed");

            var eligibilityJson = await eligibilityResponse.Content.ReadAsStringAsync();
            responseObj.EligibilityResponse = JsonConvert.DeserializeObject<GetEligibilityApiResponse>(eligibilityJson);

            return ResponseMessage<GetPatientDetailsAndEligibilityApiResponse>.Ok(responseObj, "Patient details and eligibility fetched successfully");
        }
        catch (Exception ex)
        {
            return ResponseMessage<GetPatientDetailsAndEligibilityApiResponse>.Failed($"Error fetching patient details: {ex.Message}");
        }
    }


    private async Task<(HIBApiConfig config, string credentials)> GetHIBConfigAndCredentialsAsync()
    {
        var parameter = await _unitOfWork.Parameters.GetParameter("HIBConfiguration", "GovInsurance");
        if (parameter == null)
            throw new Exception("HIB Configuration Parameter Not Found");

        var config = JsonConvert.DeserializeObject<HIBApiConfig>(parameter.ParameterValue);
        var credentials = Convert.ToBase64String(Encoding.GetEncoding("ISO-8859-1").GetBytes($"{config.HIBUsername}:{config.HIBPassword}"));
        return (config, credentials);
    }

    private static void ConfigureHttpClient(HttpClient client, HIBApiConfig config, string hibCredentials)
    {
        client.DefaultRequestHeaders.Clear();
        client.DefaultRequestHeaders.Add("Authorization", "Basic " + hibCredentials);
        client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        client.DefaultRequestHeaders.Add(config.HIBRemotekey, config.HIBRemoteValue);
        client.BaseAddress = new Uri(config.HIBUrl);
    }

}
