import { FormGroup } from '@angular/forms';
import { Patient } from './patient.model';
import { BillingTransaction } from './billing-transaction.model';
import { BillItemPriceVM } from './bill-item-price-vm.model';

export class BillingTransactionItem {
  public BillingTransactionItemId: number = 0;
  public BillingTransactionId: number | null = null;
  public PatientId: number = 0;

  public PerformerId: number | null = null;
  public PerformerName: string | null = null;

  public ServiceDepartmentId: number = 0;
  public ServiceDepartmentName: string | null = null;
  public ServiceItemId: number = 0;
  public IntegrationItemId: number = 0;
  public ItemCode: string | null = null;
  public ProcedureCode: string | null = null;
  public ItemId: number = 0;
  public ItemName: string | null = null;

  public Price: number = 0;
  public SAARCCitizenPrice: number = 0;
  public ForeignerPrice: number = 0;
  public InsForeignerPrice: number = 0;
  public Quantity: number = 0;
  public SubTotal: number = 0;
  public DiscountPercent: number = 0;
  public DiscountPercentAgg: number = 0;
  public DiscountAmount: number = 0;
  public Tax: number = 0;
  public TotalAmount: number = 0;

  public BillStatus: string | null = null;
  public RequisitionId: number | null = null;
  public RequisitionDate: string | null = null;
  public PaidDate: string | null = null;
  public Remarks: string | null = null;
  public ReturnStatus: boolean | null = null;
  public ReturnQuantity: number | null = null;

  public CounterId: number = 0;
  public CounterDay: string | null = null;
  public CreatedBy: number = 0;
  public CreatedOn: string | null = null;
  public CancelRemarks: string | null = null;

  public ItemList: BillItemPriceVM[] = [];
  public TaxPercent: number = 0;
  public CancelledBy: number | null = null;
  public CancelledOn: string | null = null;
  public BillingPackageId: number | null = null;

  public IsPaid: boolean = true;
  public IsDuplicateItem: boolean = false;

  public Patient: Patient = new Patient();
  public ServiceDepartment: any = null;

  public BillingTransactionItemValidator: FormGroup | null = null;

  public PrescriberId: number | null = null;
  public PrescriberName: string | null = null;
  public PatientVisitId: number | null = null;
  public BillItemRequisitionId: number | null = null;

  public IsTaxApplicable: boolean = true;
  public TaxableAmount: number = 0;
  public PatientName: string | null = null;
  public NonTaxableAmount: number = 0;
  public PaymentReceivedBy: number | null = null;
  public PaidCounterId: number | null = null;
  public BillingType: string | null = null;
  public RequestingDeptId: number | null = null;

  public IsSelected: boolean = false;
  public IsValidSelDepartment: boolean = true;
  public IsValidSelItemName: boolean = true;
  public IsvalidSelPerformerDr: boolean = true;
  public IsValidSelPrescriberDr: boolean = true;

  public BillItemPriceId: number = 0;
  public RequestingUserNameNDept: string | null = null;
  public VisitType: string | null = null;

  public ItemIntegrationName: string | null = null;
  public IntegrationName: string | null = null;
  public SrvDeptIntegrationName: string | null = null;

  public IsDoctorMandatory: boolean = false;
  public IsZeroPriceAllowed: boolean = false;
  public IsPriceValid: boolean = true;
  public PriceCategory: string = 'Normal';
  public PriceCategoryId: number = 1;

  public IsInsurancePackage: boolean = false;
  public PatientInsurancePackageId: number | null = null;

  public FullName: string = '';
  public StartDate: string | null = null;
  public EndDate: string | null = null;
  public IsExistBedFeatureId: boolean = false;

  public ModifiedBy: number | null = null;
  public ModifiedOn: string | null = null;
  public IsLastBed: boolean = false;

  public ProvisionalReceiptNo: number | null = null;
  public ProvisionalReceiptNoFormatted: string = '';
  public ProvisionalFiscalYearId: number | null = null;
  public ProvisionalFiscalYear: number | null = null;
  public IsInsurance: boolean = false;
  public DiscountSchemeId: number = 0;
  public DiscountApplicable: boolean = true;
  public OldDiscountPercent: number = 0;
  public DisableAssignedDrField: boolean = false;
  public AllowMultipleQty: boolean = true;

  public BillingTransaction: BillingTransaction | null = null;
  public AssignedDoctorList: any[] = [];

  public IsDoubleEntry_Now: boolean = false;
  public IsDoubleEntry_Past: boolean = false;

  public CreatedByObj = { EmployeeId: null, FullName: null, DepartmentName: null };
  public ModifiedByObj = { EmployeeId: null, FullName: null, DepartmentName: null };
  public DocObj: any = { EmployeeId: null, FullName: '' };

  public OrderStatus: string | null = null;
  public AllowCancellation: boolean = false;
  public LabTypeName: string = 'op-lab';
  public GovtInsurancePrice: number = 0;
  public InsBillItemPriceEditable: boolean = false;

  public ShowProviderName: boolean = false;
  public IsValidIPItemLevelDisocunt: boolean = true;
  public ReferredById: number | null = null;
  public IsPriceChangeAllowed: boolean = false;
  public IsCoPayment: boolean = false;
  public CoPaymentCashAmount: number = 0;
  public CoPaymentCreditAmount: number = 0;
  public CoPaymentCashPercent: number = 0;
  public CoPaymentCreditPercent: number = 0;
  public ProvisionalReturnItemId: number | null = null;
  public IsAutoBillingItem: boolean = false;
  public IsAutoCalculationStop: boolean = false;
  public IsItemLevelDiscount: boolean = false;
  public IsProvisionalDischarge: boolean = false;
  public IsBedChargeQuantityEdited: boolean = false;
  public BedChargeQuantityEditedDate: string | null = null;
  public PreviousQuantity: number = 0;
  public IsPackageItem: boolean = false;

  public UseCappingAPI: boolean = false;
  public IsBillingCappingApplicable: boolean = false;
}
