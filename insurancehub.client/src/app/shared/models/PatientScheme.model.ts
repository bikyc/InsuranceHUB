import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class PatientScheme {
  public PatientSchemeId: number = 0;
  public PatientId: number = 0;
  public PatientCode: string = "";
  public LatestPatientVisitId: number = 0;
  public SchemeId: number = 0;
  public PriceCategoryId: number = 0; 
  public PolicyNo: string = "";
  public OpCreditLimit: number = 0;
  public IpCreditLimit: number = 0;
  public PolicyHolderEmployerName: string = "";
  public PolicyHolderEmployerID: string = "";
  public PolicyHolderUID: string = "";
  public RegistrationCase: string = "Medical"; 
  public RegistrationSubCase: string = "non work related"; 
  public LatestClaimCode: number = 0;
  public OtherInfo: string = "";
  public IsActive: boolean = true;
  public GeneralCreditLimit: number = 0;
  public SubSchemeId: number = 0;
  public Ins_FirstServicePoint: string = '';
  public ReferralCode: string = '';
  public ValidReferralCode: boolean = false;
  public IsDependent = false;
  public RelationWithPolicyHolder = "";
  public BeneficiaryCode: string = "";
  public HasBeneficiaryBalance: boolean = false;
  
}
