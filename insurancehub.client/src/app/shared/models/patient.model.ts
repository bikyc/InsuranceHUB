import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { CountrySubdivision } from "./countrySubdivision.model";
import { Address } from "./address.model";
import { Guarantor } from "./gurantor.model";
import moment from "moment";
import { PatientCareTaker_DTO } from "../DTOs/PatientCareTaker_DTO.dto";
import { PatientScheme } from "./PatientScheme.model";
import { SSU_InformationModel } from "./SSU_Information.model";
import { PatientFilesModel } from "./patient-file.model";
import { PatientIdentity } from "../DTOs/patient-identity.dto";
import { ImagingItemRequisition } from "./imaging-items-requisition.model";
import { LabTestRequisition } from "./lab-test-requisition.model";
import { AdmissionModel } from "./admission.model";
import { Visit } from "./visit.model";
import { Appointment } from "./appointment.model";
import { MedicationPrescription } from "./medication-prescription.model";
import { Vitals } from "./vitals.model";
import { Allergy } from "./allergy.model";
import { SocialHistory } from "./social-history.model";
import { SurgicalHistory } from "./surgical-history.model";
import { FamilyHistory } from "./family-history.model";
import { PastMedical } from "./past-medical.model";
import { ActiveMedical } from "./active-medical.model";
import { InsuranceInfo } from "./insurance-info.model";
import { KinEmergencyContact } from "./kim-emergency-contact.model";
import { INS_API_LOG_DTO } from "../DTOs/ins-api-log.dto";
import { NepaliDate } from "../calendar/np/nepali-dates";

export class Patient {
  public PatientId: number = 0;
  public PatientName: string = "";
  public PatientNo: number = 0;
  public Salutation: string = '';
  public FirstName: string = "";
  public MiddleName: string = "";
  public LastName: string = "";
  public FullName: string = ""; 
  public DateOfBirth: string = "";
  public Gender: string = "";
  public PreviousLastName: string = "";
  public WardName: string = "";
  public WardId: string = "";
  public BedNo: number = 0;
  public BedCode: string = "";
  public CreatedOn: string = "";
  public CreatedBy: number = 0;
  public ModifiedOn: string = "";
  public ModifiedBy: number = 0;
  public MaritalStatus: string = "";
  public TreatmentType: string = "";
  public EMPI: string = "";
  public ShortName: string = "";
  public Race: string = "";
  public PhoneNumber: string = "";
  public PassportNumber: string = "";
  public LandLineNumber: string = "";
  public PhoneAcceptsText: boolean = false;
  public IDCardNumber: string = "";
  public EmployerInfo: string = "";
  public Occupation: string = "";
  public EthnicGroup: string = "";
  public IsPatientCasteMandatory: boolean = false;
  public BloodGroup: string = "";
  public Email: string = "";
  public CountryId: number = 0;
  public CountryName: string = "";
  public CountrySubDivisionId: number = 0;
  public WardNumber: number = 0;
  public Age: string = "";
  public AgeUnit: string = 'Y'; 
  public IsDobVerified: boolean = false;
  public PatientCode: string = "";
  public PrefferedLanguage: string="";
  public IsActive: boolean = true;
  public IsOutdoorPat: boolean = false;
  public PatientNameLocal: string = "";
  public Address: string = "";
  public FullAddress: string = "";
  public IsDialysis: boolean = false;
  public DialysisCode: number = 0;
  public DischargeDate: string = ""; 

  public Telmed_Patient_GUID: string="";

  //display purpose only
  public CountrySubDivisionName: string = "";

  public CountrySubDivision: CountrySubdivision = new CountrySubdivision();
  public Ins_HasInsurance: boolean = false;
  public Ins_NshiNumber: string = "";
  public Ins_InsuranceBalance: number = 0;
  public ClaimCode: number = 0;
  public RequestingDepartment: number = 0;

  public Ins_InsuranceCurrentBalance: number = 0;
  public PatientWorkingLocation: string = "";
  public RelationWithPolicyHolder: string = "";
  public IsDependent: boolean = false;
  // form group

  //Patient Registration

  public Addresses: Array<Address> = new Array<Address>();
  public Guarantor: Guarantor = new Guarantor();
  public KinEmergencyContacts: Array<KinEmergencyContact> = new Array<KinEmergencyContact>();
  public Insurances: Array<InsuranceInfo> = new Array<InsuranceInfo>();


  //Clinical
  //History of patients
  public Problems: Array<ActiveMedical> = new Array<ActiveMedical>();
  public PastMedicals: Array<PastMedical> = new Array<PastMedical>();
  public FamilyHistory: Array<FamilyHistory> = new Array<FamilyHistory>();
  public SurgicalHistory: Array<SurgicalHistory> = new Array<SurgicalHistory>();
  public SocialHistory: Array<SocialHistory> = new Array<SocialHistory>();
  public Allergies: Array<Allergy> = new Array<Allergy>();
  public Vitals: Array<Vitals> = new Array<Vitals>();
  public MedicationPrescriptions: Array<MedicationPrescription> = new Array<MedicationPrescription>();


  //Appointment
  public Appointment: Array<Appointment> = new Array<Appointment>();
  public Visits: Array<Visit> = new Array<Visit>();
  public Admissions: Array<AdmissionModel> = new Array<AdmissionModel>();

  //tests
  public LabRequisitions: Array<LabTestRequisition> = new Array<LabTestRequisition>();
  public ImagingItemRequisitions: Array<ImagingItemRequisition> = new Array<ImagingItemRequisition>();
  

  public PANNumber: string = "";
  public PatientIdentities: PatientIdentity[] = [];

  public UploadedFiles: Array<PatientFilesModel> = [];
  public HasFile: boolean = false;
  public ProfilePic: PatientFilesModel = new PatientFilesModel();
  public NepaliDOB: NepaliDate = new NepaliDate();
  public PatientType: string="";
  public RunNumberType: string="";
  public RequisitionId: number=0;
  public LatestVisitType: string = "";
  public VisitType: string = "";
  public LatestVisitCode: string = "";
  public LatestVisitId: string = "";
  public LatestVisitDate: string = "";
  public IsValidMembershipTypeName: boolean = true; 
  public IsPoliceCase: boolean = false;
  public NSHI: string = "";
  public IsSSUPatient: boolean = false;
  public SSU_IsActive: boolean = false;
  public SSU_Information: SSU_InformationModel = new SSU_InformationModel();
  public FatherName: string="";
  public MotherName: string="";
  public MunicipalityId: number = 0;
  public MunicipalityName: string = "";
  public Posting: string = "";
  public PatientCategory: string = "";
  public DependentId: string = "";
  public IsDependentIdEditAble: boolean = false; 
  public APFPatientDependentIdCount: number = 0;
  public PatientScheme: PatientScheme = new PatientScheme();
  public listOfPatientIdsUsingSameDependentId: Array<number> = new Array<number>();
  public SSFPolicyNo: string="";
  public PolicyNo: string="";
  public PriceCategoryId: number=0;
  public MedicareMemberNo: string = ''; 
  public IsMedicarePatient: boolean = false;
  public IsMedicareMemberEligibleForRegistration: boolean = false;
  public IsAdmitted: boolean = false;
  public CareTaker = new PatientCareTaker_DTO();
  public CareTakerName: string = "";
  public RelationWithCareTaker: string = "";
  public CareTakerContact: string = "";
  public BedId: number = 0;
  public VisitCode: string = "";
  public SchemeId: number = 0; 
  public DepartmentName: string = "";
  public AdmittedDate: string = "";
  public IsNHSIPatient: boolean = false;

  public PatientVisitId: number = 0;
  public AgeSex: string = "";
  public SalutationName: string = '';
  public SchemeName: string = '';
  public AdmissionStatus: string = '';
  public NSHINumber: string = '';
  public LatestClaimCode: number = 0;
  public RemainingBalance: number = 0;
  public VisitDate: string = "";
  public IsPatientSearchByMemberNo: boolean = false;
  public MemberNo: string = '';
  public TakeFromRegisteredMember: boolean = false;
  public ISDCode: string = '';
  public PhoneRulesMsg: string = '';
  public LandlineRulesMsg: string = '';
  public eligibilityAPILog: INS_API_LOG_DTO = new INS_API_LOG_DTO();
  public EducationLevelName: string = "";
  public Religion: string = "";
}