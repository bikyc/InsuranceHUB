import { PharmacyBillItemVM } from "./discharge-bill.view.model";

export class BilPrint_VM {
  PatientInfo: BilPrint_PatientInfoVM = new BilPrint_PatientInfoVM();
  InvoiceInfo: BilPrint_InvoiceInfoVM = new BilPrint_InvoiceInfoVM();
  InvoiceItems: Array<BilPrint_InvoiceItemVM> = new Array<BilPrint_InvoiceItemVM>();
  VisitInfo: BilPrint_VisitInfoVM = new BilPrint_VisitInfoVM();
  DepositList: Array<BilPrint_DepositListVM> = new Array<BilPrint_DepositListVM>();
  IsInvoiceFound: boolean = false;
  PharmacyInvoiceItems: Array<PharmacyBillItemVM> = new Array<PharmacyBillItemVM>();
  DischargeInfo: BilPrint_DischargeInfoVM = new BilPrint_DischargeInfoVM();
  BillingInvoiceSummaryDepartmentWise: Array<BilPrintBillingSummaryVM> = new Array<BilPrintBillingSummaryVM>();
  BillingInvoiceSummaryCategoryWise: Array<BilPrintBillingSummaryVM> = new Array<BilPrintBillingSummaryVM>();
  PharmacySummary: Array<BilPrintPharmacySummaryVM> = new Array<BilPrintPharmacySummaryVM>();
  InvoicePrintTemplate: string = "";
  InvoicePrintTemplateSummary: string = "";
}

export class SSFBil_VM {
  PatientInfo = new Array<SSF_Invoice_PatInfo>();
  InvoiceInfo = new Array<SSF_InvoiceInfoVM>();
  InvoiceItems = new Array<SSF_InvoiceItems>();
  PhrmInvoices = new Array<SSF_PhrmInvoices>();
  BillingInvoiceInfo = new Array<SSF_BillingInvoiceInfoVM>();
  BillingInvoiceItems = new Array<SSF_BillingInvoiceItems>();
  PhrmInvoiceItems = new Array<SSF_PhrmInvoiceItems>();
  LabReportInfo = new Array<SSF_LabReportInfo>();
  RadiologyReportInfo = new Array<SSF_RadiologyReportInfo>();
  BillingInvoiceReturns = new Array<SSFInvoiceReturnsList>();
  PharmacyInvoiceReturns = new Array<SSFInvoiceReturnsList>();
}

export class SSF_LabReportInfo {
  public PatientId: number = 0;
  public ClaimCode: number = 0;
  public RequisitionIdCSV: string = "";
}

export class SSF_RadiologyReportInfo {
  public PatientId: number = 0;
  public ClaimCode: number = 0;
  public RequisitionIdCSV: number = 0;
}


export class SSF_PhrmInvoiceItems {
  public UnitPrice: number = 0;
  public ServiceCode: string = "ADJ02" //* This is hardcoded and not used anywhere else.
  public PatientId: number = 0;
  public Quantity: number = 0;
  public ClaimCode: number = 0;
  public InvoiceId: number = 0;
  public ItemName: string = '';
}

export class SSF_BillingInvoiceItems {
  public BillingTransactionItemId: number = 0;
  public PatientId: number = 0;
  public BillingTransactionId: number = 0;
  public ServiceDepartmentId: number = 0;
  public ItemId: number = 0;
  public ServiceDepartmentName: string = '';
  public ItemName: string = '';
  public Price: number = 0;
  public Quantity: number = 0;
  public SubTotal: number = 0;
  public DiscountAmount: number = 0;
  public TotalAmount: number = 0;
  public PerformerId: number = 0;
  public PerformerName: string = '';
  public RequestedById: number = 0;
  public RequestedByName: string = '';
  public RequestedBy: string = '';
  public PriceCategory: string = '';
  public ServiceCode: string = '';
  public ItemCode: string = '';
  public IsCoPayment: boolean = false;
  public DiscountPercent: number = 0;
}

export class SSF_BillingInvoiceInfoVM {
  public PatientId: number = 0;
  public NetReceivableAmount: number = 0;
  public InvoiceNumber: number = 0;
  public InvoiceCode: string = '';
  public InvoiceNumFormatted: string = '';
  public TransactionDate: string = '';
  public FiscalYearId: number = 0;
  public FiscalYear: string = '';
  public PaymentMode: string = '';
  public PaymentDetails: string = '';
  public BillStatus: string = '';
  public TransactionType: string = '';
  public InvoiceType: string = '';
  public PrintCount: number = 0;
  public SubTotal: number = 0;
  public DiscountAmount: number = 0;
  public TaxableAmount: number = 0;
  public NonTaxableAmount: number = 0;
  public TotalAmountWithoutReturn: number = 0;
  public TotalAmount: number = 0;
  public BillingTransactionId: number = 0;
  public PaidDate: string = '';
  public Tender: number = 0;
  public Change: number = 0;
  public Remarks: string = '';
  public IsInsuranceBilling: boolean = false;
  public ClaimCode: number = 0;
  public CrOrganizationId: number = 0;
  public CrOrganizationName: string = '';
  public UserName: string = '';
  public CounterId: number = 0;
  public CounterName: string = '';
  public LabTypeName: string = '';
  public PackageId: number = 0;
  public PackageName: string = '';
  public DepositAvailable: number = 0;
  public DepositUsed: number = 0;
  public DepositReturnAmount: number = 0;
  public DepositBalance: number = 0;
  public TaxTotal: number = 0;
  public ReceivedAmount: number = 0;
  public InvoiceDate: number = 0;
  public DepartmentName: string = "";
}

export class SSF_PhrmInvoices {
  public InvoiceNumber: number = 0;
  public InvoiceNoFormatted: string = "";
  public TotalAmountWithoutReturn: number = 0;
  public TotalAmount: number = 0;
  public ReceivedAmount: number = 0;
  public BalanceAmount: number = 0;
  public ClaimCode: number = 0;
  public PatientId: number = 0;
  public InvoiceId: number = 0;
  public InvoiceDate: string = "";
}

export class SSF_Invoice_PatInfo {
  public PolicyNo: string = '';
  public PatientId: number = 0;
  public PatientCode: string = '';
  public ShortName: string = '';
  public Gender: string = '';
  public DateOfBirth: string = '';
  public Age: string = '';
  public CountryId: number = 0;
  public CountryName: string = '';
  public CountrySubDivisionId: number = 0;
  public CountrySubDivisionName: string = '';
  public Address: string = '';
  public PhoneNumber: string = '';
  public MembershipTypeId: number = 0;
  public MembershipTypeName: string = '';
  public PANNumber: string = '';
  public PatientNameLocal: string = '';
  public Ins_NshiNumber: string = '';
  public MunicipalityName: string = '';
  public PolicyHolderUID: string = '';
  public PolicyHolderEmployerId: string = '';
  public SchemeType: number = 0;
  public Admitted: string = "0"; //* server sends this as string hence cannot make it boolean.
  public Diagnosis: string = '';
  public AdmissionDate: string = '';
  public DischargeDate: string = '';
  public DischargeTypeName: string = '';
  public CaseSummary: string = '';
  public IsDead: number = 0;
  public ClaimCode: number = 0;
  public VisitType: string = "";
  public VisitCreationDate: string = "";
  public WardNumber: string = '';
  public SchemeName: string = '';
  public SchemeId: number = 0;
  public DepartmentName: string = '';
  public PatientVisitId: number = 0;
}

export class SSFClaimList {
  public IsSelected: boolean = false;
  public InvoiceNo: number=0;
  //public ClaimCode : number=0;
  public SSFClaimCode: string='';
  public InvoiceTotalAmount: number=0;
  public Cash: number=0;
  public Credit: number=0;
  public ClaimedAmount: number=0;
  public Status: boolean=false;
  public BillingTransactionId: number=0;
  public InvoiceNoFormatted: string = "";
  public BookingStatus: string = "";
  public ModuleName: string = "";
  public InvoiceTotalAmountWithoutReturn: number = 0;
  public IsCreditNote: boolean = false;
}

export class PatientWiseSSFClaimList {
  public IsSelected: boolean = false;
  public PolicyNo: string='';
  public PatientName: string='';
  public PatientCode: string='';
  public Address: string='';
  public PatientId: number = 0;
  public ClaimCode: number = 0;
  public InvoiceList: Array<SSFClaimList> = new Array<SSFClaimList>();
  public InvoiceReturnsList = new Array<SSFInvoiceReturnsList>();
  public SchemeType: number = 0;
  public SchemeId: number = 0;
}

export class SSF_InvoiceItems {
  public BillingTransactionItemId: number = 0;
  public PatientId: number = 0;
  public BillingTransactionId: number = 0;
  public ServiceDepartmentId: number = 0;
  public ItemId: number = 0;
  public ServiceDepartmentName: string = '';
  public ItemName: string = '';
  public Price: number = 0;
  public Quantity: number = 0;
  public SubTotal: number = 0;
  public DiscountAmount: number = 0;
  public TotalAmount: number = 0;
  public PerformerId: number = 0;
  public PerformerName: string = '';
  public RequestedById: number = 0;
  public RequestedByName: string = '';
  public RequestedBy: string = '';
  public PriceCategory: string = '';
  public ServiceCode: string = '';
}

export class BilPrint_PatientInfoVM {
  public PatientId: number = 0;
  public PatientCode: string = '';
  public ShortName: string = '';
  public Gender: string = '';
  public DateOfBirth: string = '';
  public Age: string = '';
  public AgeFormatted: string = "";
  public CountryId: number = 0;
  public CountryName: string = '';
  public CountrySubDivisionId: number = 0;
  public CountrySubDivisionName: string = '';
  public Address: string = '';
  public WardNumber: number = 0;
  public PhoneNumber: string = '';
  public MembershipTypeId: number = 0;
  public MembershipTypeName: string = '';
  public PANNumber: string = '';
  public PatientNameLocal: string = '';
  public Ins_NshiNumber: string = '';
  public MunicipalityName: string = '';
  public SSFPolicyNo: string = "";
  public PolicyNo: string = "";
}

export class BilPrint_InvoiceInfoVM {
  public InvoiceNumber: number = 0;
  public InvoiceCode: string = '';
  public InvoiceNumFormatted: string = '';
  public TransactionDate: string = '';
  public FiscalYearId: number = 0;
  public FiscalYear: string = '';
  public PaymentMode: string = '';
  public PaymentDetails: string = '';
  public BillStatus: string = '';
  public TransactionType: string = '';
  public InvoiceType: string = '';
  public PrintCount: number = 0;
  public SubTotal: number = 0;
  public DiscountAmount: number = 0;
  public TaxableAmount: number = 0;
  public NonTaxableAmount: number = 0;
  public TotalAmount: number = 0;
  public BillingTransactionId: number = 0;
  public PaidDate: string = '';
  public Tender: number = 0;
  public Change: number = 0;
  public Remarks: string = '';
  public IsInsuranceBilling: boolean = false;
  public ClaimCode: number = 0;
  public CrOrganizationId: number = 0;
  public CreditOrganizationName: string = '';
  public UserName: string = '';
  public CounterId: number = 0;
  public CounterName: string = '';
  public LabTypeName: string = '';
  public PackageId: number = 0;
  public PackageName: string = '';
  public DepositAvailable: number = 0;
  public DepositUsed: number = 0;
  public DepositReturnAmount: number = 0;
  public DepositBalance: number = 0;
  public TaxTotal: number = 0;
  public ReceivedAmount: number = 0;
  public SchemeName: string = '';
  public OtherCurrencyDetail: string = '';
  public ToBePaid: number = 0;
  public PrintTemplateType: string = "";
  public DischargeStatementId: number = 0;
  public ApiIntegrationName: string = "";
  public IsBillingCoPayment: boolean = false;
  public IsPharmacyCoPayment: boolean = false;
}


export class BilPrint_InvoiceItemVM {
  public BillingTransactionItemId: number = 0;
  public ServiceDepartmentId: number = 0;
  public IntegrationItemId: number = 0;
  public ItemId: number = 0;
  public ItemCode: string = '';
  public ServiceDepartmentName: string = '';
  public ItemName: string = '';
  public Price: number = 0;
  public Quantity: number = 0;
  public SubTotal: number = 0;
  public DiscountPercent: number = 0;
  public DiscountAmount: number = 0;
  public TotalAmount: number = 0;
  public PerformerId: number = 0;
  public PerformerName: string = '';
  public RequestedById: number = 0;
  public RequestedByName: string = '';
  public RequestedBy: string = '';
  public ReferredById: number = 0;
  public ReferredBy: string = '';
  public PriceCategory: string = '';
  public BillDate: string = '';
  public IsCoPayment: boolean = false;
  public ServiceCategoryCode: string = "";
  public ServiceCategoryName: string = "";
}


export class BilPrint_VisitInfoVM {
  public PatientVisitId: number = 0;
  public VisitCode: string = '';
  public AdmissionDate: string = '';
  public DischargeDate: string = '';
  public WardName: string = '';
  public BedNumber: string = '';
  public BedCode: string = '';
  public ConsultingDoctor: string = '';
  public ItemsRequestingDoctorsId: Array<number> = new Array<number>();
  public ItemsRequestingDoctors: string = '';
  public DepartmentName: string = '';
  public ConsultingDoctorId: number = 0;
}

export class BilPrint_DepositListVM {
  public DepositId: number = 0;
  public ReceiptNo: number = 0;
  public FiscalYearFormatted: string = '';
  public DepositReceiptNoFormattted: string = '';
  // public DepositType: string = '';
  public TransactionType: string = '';
  public InAmount: number = 0;
  public OutAmount: number = 0;
  public CreatedOn: string = '';
  public UserName: string = '';
}

export class SSF_InvoiceInfoVM {
  public PatientId: number = 0;
  public NetReceivableAmount: number = 0;
  public InvoiceNumber: number = 0;
  public InvoiceCode: string = '';
  public InvoiceNumFormatted: string = '';
  public TransactionDate: string = '';
  public FiscalYearId: number = 0;
  public FiscalYear: string = '';
  public PaymentMode: string = '';
  public PaymentDetails: string = '';
  public BillStatus: string = '';
  public TransactionType: string = '';
  public InvoiceType: string = '';
  public PrintCount: number = 0;
  public SubTotal: number = 0;
  public DiscountAmount: number = 0;
  public TaxableAmount: number = 0;
  public NonTaxableAmount: number = 0;
  public TotalAmount: number = 0;
  public BillingTransactionId: number = 0;
  public PaidDate: string = '';
  public Tender: number = 0;
  public Change: number = 0;
  public Remarks: string = '';
  public IsInsuranceBilling: boolean = false;
  public ClaimCode: number = 0;
  public CrOrganizationId: number = 0;
  public CreditOrganizationName: string = '';
  public UserName: string = '';
  public CounterId: number = 0;
  public CounterName: string = '';
  public LabTypeName: string = '';
  public PackageId: number = 0;
  public PackageName: string = '';
  public DepositAvailable: number = 0;
  public DepositUsed: number = 0;
  public DepositReturnAmount: number = 0;
  public DepositBalance: number = 0;
  public TaxTotal: number = 0;
  public ReceivedAmount: number = 0;
  public InvoiceDate: number = 0;
}

export class BilPrint_DischargeInfoVM {
  public DischargeStatementId: number=0;
  public StatementNo: string='';
  public StatementTime: string='';
  public StatementDate: string='';
}

export class BilPrintBillingSummaryVM {
  public GroupName: string='';
  public ServiceCategoryName: string='';
  public ServiceDepartmentName: string='';
  public SubTotal: number=0;
  public DiscountAmount: number=0;
  public TotalAmount: number=0;
}

export class BilPrintPharmacySummaryVM {
  public GroupName: string='';
  public SubTotal: number=0;
  public DiscountAmount: number=0;
  public TotalAmount: number=0;
}

export class SSFInvoiceReturnsList {
  public PatientId: number = 0;
  public ReturnId: number = 0;
  public CreditNoteNumber: number = 0;
  public CreditNoteNumberFormatted: string = "";
  public ClaimCode: number = 0;
  public TotalAmount: number = 0;
  public ModuleName: string = "";
}
