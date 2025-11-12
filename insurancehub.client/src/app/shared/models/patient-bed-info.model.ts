import moment from 'moment/moment';
import { BedFeature } from './bed-feature.model';
import { ENUM_DateTimeFormat } from '../shared-enums';
import { AddPatientVisitConsultants_DTO } from '../DTOs/add-patient-visit-consultants.dto';
export class PatientBedInfo {
  public PatientBedInfoId: number = 0;
  public PatientVisitId: number = 0;
  public PatientId: number = 0;

  public WardId: number = 0;
  public BedFeatureId: number = 0;
  public BedId: number = 0;
  public BedPrice: number = 0;
  public Action: string = "";
  public PrefferedLanguage: string = "";
  public OutAction: string = "";
  public Remarks: string = "";
  public StartedOn: string = "";
  public EndedOn: string = "";
  public SecondaryDoctorId: number = 0;
  public SecondaryDoctorName: string = "";
  public CreatedBy: number = 0;
  public CreatedOn: string = moment().format(ENUM_DateTimeFormat.Year_Month_Day_Hour_Minute);
  public IsActive: boolean = true;
  public ReservedBedId: number = 0;

  public RequestingDeptId: number = 0;
  public IsValidReqDepartment: boolean = true;
  public IsExistBedFeatureId: boolean = false;
  public IsInsurancePatient: boolean = false;

  public ReceivedBy: number = 0;
  public ReceivedOn: string = "";
  public AddPatientVisitConsultants = new Array<AddPatientVisitConsultants_DTO>()
  public SelectedBedFeature: BedFeature = new BedFeature();
  public IsZeroPriceAllowed: boolean = false;
  
}
