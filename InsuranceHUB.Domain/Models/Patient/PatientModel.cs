using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace InsuranceHub.Domain.Models.Patient
{
    public class PatientModel
    {
        public int PatientId { get; set; }
        public int PatientNo { get; set; }
        public string EMPI { get; set; }
        public string Salutation { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }
        public string FatherName { get; set; }
        public string MotherName { get; set; }
        public string Gender { get; set; }
        public string Age { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedBy { get; set; }
        public int? ModifiedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string PreviousLastName { get; set; }
        public string PrefferedLanguage { get; set; }
        public string MaritalStatus { get; set; }
        public string Race { get; set; }
        public string PhoneNumber { get; set; }
        public string LandLineNumber { get; set; }
        public string PassportNumber { get; set; }
        public string Email { get; set; }
        public string IDCardType { get; set; }
        public bool PhoneAcceptsText { get; set; }
        public string IDCardNumber { get; set; }
        public string Occupation { get; set; }
        public string EthnicGroup { get; set; }
        public string BloodGroup { get; set; }
        public string EmployerInfo { get; set; }
        public int CountryId { get; set; }
        public int? CountrySubDivisionId { get; set; }
        public string PatientCode { get; set; }
        public bool IsActive { get; set; }
        public string EducationLevelName { get; set; }
        public string Religion { get; set; }
        [NotMapped]
        public string TreatmentType { get; set; }
        public bool IsOutdoorPat { get; set; }
        public int? DialysisCode { get; set; }
        public int? MunicipalityId { get; set; }

        [NotMapped]
        public string MunicipalityName { get; set; }
        public short? WardNumber { get; set; }

        public string ShortName
        {
            get; set;

        }

        public bool IsDobVerified { get; set; }

        public string Address { get; set; }

        public string PANNumber { get; set; }

        [NotMapped]
        public string CountrySubDivisionName { get; set; }

        [NotMapped]
        public string CountryName { get; set; }

        [NotMapped]
        public bool? HasFile { get; set; }


        [NotMapped]
        public string WardName { get; set; }
        [NotMapped]
        public string BedNo { get; set; }
        [NotMapped]
        public int? BedId { get; set; }
        public string PatientNameLocal { get; set; }

        [NotMapped]
        public string MembershipTypeName { get; set; }
        [NotMapped]
        public double MembershipDiscountPercent { get; set; }

        public bool Ins_HasInsurance { get; set; }
        public string Ins_NshiNumber { get; set; }
        public double Ins_InsuranceBalance { get; set; }
        public long? Ins_LatestClaimCode { get; set; }
        public bool IsSSUPatient { get; set; }
        public bool SSU_IsActive { get; set; }
        public bool IsVaccinationPatient { get; set; }
        public bool IsVaccinationActive { get; set; }
        public int? VaccinationRegNo { get; set; }
        public int? VaccinationFiscalYearId { get; set; }

        public string Telmed_Patient_GUID { get; set; }

        public string Posting { get; set; }
        public string Rank { get; set; }
        public string DependentId { get; set; }
        [NotMapped]
        public bool IsMedicarePatient { get; set; }
        public bool IsMemberSearchApplicable { get; set; }
    }
}
