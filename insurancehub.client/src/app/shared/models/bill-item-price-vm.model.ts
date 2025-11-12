export class BillItemPriceVM {
  public ProcedureCode: string = '';
  public ItemName: string = '';
  public Price: number = 0;
  public ItemId: number = 0;  
  public ItemCode: string = '';  
  public TaxApplicable: boolean = true;
  public EHSPrice: number = 0;
  public SAARCCitizenPrice: number = 0;
  public ForeignerPrice: number = 0;
  public InsForeignerPrice: number = 0;
  public GovtInsurancePrice: number = 0;
  public ServiceDepartmentId: number = 0;
  public ServiceDepartmentName: string = '';
  public DiscountApplicable: boolean = true;

  public AllowMultipleQty: boolean = true;
  public IsDoctorMandatory: boolean = false;
  public IsZeroPriceAllowed: boolean = false;
  public IsErLabApplicable: boolean = false;
  public IsAutoAdded: boolean = false;
  public IsPriceChangeAllowed = false;

  public IsCoPayment: boolean = false;
  public CoPaymentCashPercent: number = 0;
  public CoPaymentCreditPercent: number = 0;
  public DiscountPercent: number = 0;
  public ServiceItemId: number = 0;
  public IntegrationItemId: number = 0;
}
