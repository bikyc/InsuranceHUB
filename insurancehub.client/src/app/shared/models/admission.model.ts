
import { PatientScheme } from './PatientScheme.model';
import { PatientCareTaker_DTO } from '../DTOs/PatientCareTaker_DTO.dto';
import { PatientBedInfo } from './patient-bed-info.model';
import { BillingDeposit } from './billing-deposit.model';
import { BillingTransaction } from './billing-transaction.model';
import { AddPatientVisitConsultants_DTO } from '../DTOs/add-patient-visit-consultants.dto';
import { INS_API_LOG_DTO } from '../DTOs/ins-api-log.dto';


export class AdmissionModel {
  public PatientVisitId: number = 0;
  public PatientAdmissionId: number = 0;
  public PatientId: number = 0;
  public AdmittingDoctorId: number = 0;
  public CreatedBy: number = 0;
  public CreatedOn: string = "";
  public TransferDate: string = "";
  public AdmissionDate: string = "";
  public DischargeDate: string = "";
  public AdmissionNotes: string = "";
  public AdmissionOrders: string = "";
  public AdmissionStatus: string = "";
  public DischargedBy: number = 0;
  public BillStatusOnDischarge: string = "";
  public DischargeRemarks: string = "";
  public ModifiedOn: string = "";
  public ModifiedBy: number = 0;
  public PatientBedInfos: Array<PatientBedInfo> = new Array<PatientBedInfo>();
  public CareOfPersonName: string = "";
  public CareOfPersonPhoneNo: string = "";
  public CareOfPersonRelation: string = "";

  public BilDeposit: BillingDeposit = new BillingDeposit();
  public RequestingDeptId: number = 0;   
  public CancelledOn: string = "";
  public CancelledBy: string = "";
  public CancelledRemark: string = "";
  public ProcedureType: string = "";
  public IsPoliceCase: boolean = false;
  public Ins_HasInsurance: boolean = false;
  public ClaimCode: number = 0;
  public AdmissionCase: string = "";
  public Ins_NshiNumber: string = "";
  public IsInsurancePatient: boolean = false;
  public Ins_InsuranceBalance: number = 0;
  public BillingTransaction: BillingTransaction = new BillingTransaction();
  public DiscountSchemeId: number = 0;
  public MembershipTypeName: string = "";
  public MembershipDiscountPercent: number = 0;
  public IsValidMembershipTypeName: boolean = true;
  public IsBillingEnabled: boolean = false;
  public IsLastClaimCodeUsed: boolean = false;
  public ProvisionalDiscPercent: number = 0;
  public IsItemDiscountEnabled: boolean = false;
  public PriceCategoryId: number = 0;
  public CareTaker = new PatientCareTaker_DTO();
  public PatientSchemesMap = new PatientScheme();
  public AddPatientVisitConsultants = new Array<AddPatientVisitConsultants_DTO>();
  public Name: string = "";
  PatientCategory: string = "";
  PatientWorkingLocation: string = "";
  PrefferedLanguage: string = "";
  insAPILog: INS_API_LOG_DTO = new INS_API_LOG_DTO();

}
