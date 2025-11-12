import {
  FormBuilder, FormControl, FormGroup, ValidatorFn, Validators
} from '@angular/forms';
import moment from "moment/moment";
import { ENUM_DateTimeFormat } from '../shared-enums';
import { Patient } from './patient.model';
import { INS_API_LOG_DTO } from '../DTOs/ins-api-log.dto';



export class Visit {
  public PatientId: number = 0;
  public PatientVisitId: number = 0;
  public VisitCode: string = ""; 
  public VisitDate: string = moment().format(ENUM_DateTimeFormat.Year_Month_Day);
  public DepartmentId: number = 0;
  public DepartmentName: string = '';
 
  public PerformerId: number=0;  
  public PerformerName: string = ''; 
  public Comments: string = '';
  public ReferredBy: string = ''; 
  public VisitType: string = '';
  public VisitStatus: string = '';
  public VisitTime: string = moment().add(5, 'minutes').format('HH:mm');
  public VisitDuration: number = 0;
  public Patient: Patient = new Patient();
  public AppointmentId: number=0;
  public BillingStatus: string = '';
  public ReferredById: number=0; 
  public AppointmentType: string = '';
  public ParentVisitId: number=0;
  public IsVisitContinued: boolean = false;
  public IsFavorite: boolean = false;
  public IsFollowUp: boolean = false;
  public IsFollowUpEdit: boolean = false;
  public CreatedOn: string = '';
  public CreatedBy: number = 0;
  public IsActive: boolean = true;
  public ModifiedBy: number=0;
  public ModifiedOn: string = '';
  public Remarks: string = '';
  public QueueNo: number = 0;
  public IsValidSelProvider: boolean = true;
  public IsValidSelDepartment: boolean = true;
  public IsSignedVisitSummary: boolean = false;
  public PrescriberId: number=0;
  public ClaimCode: number=0;
  public CurrentCounterId: number=0;
  public ConcludeDate: string = '';
  public ERTabName: string = '';
  public DeptRoomNumber: string = '';
  public Ins_HasInsurance: boolean = false;
  public IsLastClaimCodeUsed: boolean = false;
  public ShortName: string = '';
  public PatientCode: string = '';
  public PriceCategoryId: number=0;
  public SchemeId: number=0;
  public Age: string = "";
  public Gender: string = "";
  public PhoneNumber: string = "";
  public SchemeName: string = "";
  public IsSelected: boolean = false;
  public Address: string = "";
  public DateOfBirth: string = "";
  public TicketCharge: number = 0;
  IsTriaged: number=0;
  public ENUM_BillingStatus: any;
  public MaxInternalReferralDays: number = 0;
  public IsFreeVisit: boolean = false;
  public AdmissionDate: string = '';
  public IsManualFreeFollowup: boolean = false;
  public ReferralCode: string = '';
  PatientCategory: string = '';
  PatientWorkingLocation: string = '';
  public ApiIntegrationName: string = '';
  eligibilityAPILog: INS_API_LOG_DTO = new INS_API_LOG_DTO();
 
}






