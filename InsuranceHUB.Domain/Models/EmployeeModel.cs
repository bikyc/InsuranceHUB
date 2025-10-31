using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InsuranceHub.Domain.Models
{
    public class EmployeeModel
    {
        [Key]
        public int EmployeeId { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string ImageFullPath { get; set; }
        public string ImageName { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public DateTime? DateOfJoining { get; set; }
        public string ContactNumber { get; set; }
        public string Email { get; set; }
        public string ContactAddress { get; set; }
        public bool IsActive { get; set; }
        public string Salutation { get; set; }
        public string EmployeeCode { get; set; }
        public int? NationalityId { get; set; }
        public int? ReligionId { get; set; }
        public string DoctorSpecialty { get; set; }
        public string DoctorType { get; set; }
        public string PractitionerRole { get; set; }
        public int? DepartmentId { get; set; }
        public int? EmployeeRoleId { get; set; }
        public int? EmployeeTypeId { get; set; }
        public int? ClinicalRoleId { get; set; }

        public int? CreatedBy { get; set; }
        public DateTime? CreatedOn { get; set; }
        public int? ModifiedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public string Gender { get; set; }

        public string FullName { get; set; }

 
        public Int16? Extension { get; set; }
        public Int16? SpeedDial { get; set; }
        public string OfficeHour { get; set; }
        public string RoomNo { get; set; }
        public string MedCertificationNo { get; set; }
        public string Signature { get; set; }
        public string LongSignature { get; set; }

        //public virtual DepartmentModel Department { get; set; }
        //public virtual EmployeeRoleModel EmployeeRole { get; set; }
        //public virtual EmployeeTypeModel EmployeeType { get; set; }
        //public virtual ClinicalRoleModel ClinicalRole { get; set; }

        public bool? IsAppointmentApplicable { get; set; }
        public string LabSignature { get; set; }

        public string RadiologySignature { get; set; }

        public string BloodGroup { get; set; }
        public string DriverLicenseNo { get; set; }
        public string NursingCertificationNo { get; set; }
        public string HealthProfessionalCertificationNo { get; set; }
        public int? DisplaySequence { get; set; }

        public string SignatoryImageName { get; set; }

        [NotMapped]
        public string SignatoryImageBase64 { get; set; }


        public bool IsExternal { get; set; }

        //[NotMapped]
        //public List<BillServiceItemModel> ServiceItemsList { get; set; }

        [NotMapped]
        public int LedgerId { get; set; }
        [NotMapped]
        public string LedgerType { get; set; }

        public double? TDSPercent { get; set; }
        public bool? IsIncentiveApplicable { get; set; }
        public string PANNumber { get; set; }


        public int? OpdNewPatientServiceItemId { get; set; }
        public int? OpdOldPatientServiceItemId { get; set; }
        public int? FollowupServiceItemId { get; set; }
        public int? InternalReferralServiceItemId { get; set; }


    }
}
