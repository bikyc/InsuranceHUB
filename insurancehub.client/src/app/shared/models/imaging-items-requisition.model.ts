export class ImagingItemRequisition {
  public ImagingRequisitionId: number = 0;
  public PatientVisitId: number = 0;
  public PatientId: number = 0;
  public PrescriberName: string = ""; 
  public ImagingTypeId: number = 0;
  public ImagingTypeName: string = "";
  public ImagingItemId: number = 0;
  public ImagingItemName: string = "";
  public ProcedureCode: string = "";
  public ImagingDate: string = "";
  public RequisitionRemarks: string = "";
  public OrderStatus: string = "";
  public Urgency: string = "Normal";
  public PrescriberId: number = 0;
  public BillingStatus: string = "";
  public DiagnosisId: number = 0;
  public HasInsurance: boolean = false;
  public WardName: string = "";
  public ServiceItemId: number = 0;
}
