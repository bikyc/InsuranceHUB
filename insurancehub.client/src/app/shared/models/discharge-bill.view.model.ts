import { NepaliDate } from "../../shared/calendar/np/nepali-dates";
import { DischargeStatementViewModel } from "./discharge-statement-view.model";

export class DischargeBillVM {
  public AdmissionDetail: AdmissionDetailVM = new AdmissionDetailVM();
  public PatientDetail: PatientDetailVM = new PatientDetailVM();
  public BillingTransactionDetail: BillingTransactionDetailVM = new BillingTransactionDetailVM();
  public DepositDetails: Array<DepositDetailVM> = new Array<DepositDetailVM>();
  public BillItemSummary: Array<BillItemSummary> = new Array<BillItemSummary>();
  public BillItems: Array<DischargeSummaryBillItem> = new Array<DischargeSummaryBillItem>(); 
  public DischargeInfo: DischargeStatementViewModel = new DischargeStatementViewModel();
  public TotalAmount: number = 0;

  public SubTotal: number = 0;
  public DiscountAmount: number = 0;
  public Tax: number = 0;
  public Quantity: number = 0;
  public DepositBalance: number = 0;
}


export class BillItemSummary {
  public ItemGroupName: string='';
  public Items: Array<BillItemVM> = new Array<BillItemVM>();
  public TotalAmount: number = 0;
  public SubTotal: number = 0;
  public DiscountAmount: number = 0;
  public TotalPrice: number = 0;
  public Tax: number = 0;
  public Quantity: number = 0;
}

//list of all billing items
export class BillItemVM {
  public ItemId: number = 0;
  public BillDate: string='';
  public ItemGroupName: string='';
  public ItemName: string='';
  public DoctorId: number = 0;
  public DoctorName: string='';
  public Price: number = 0;
  public Quantity: number = 0;
  public SubTotal: number = 0;
  public DiscountAmount: number = 0;
  public TaxAmount: number = 0;
  public TotalAmount: number = 0;
}


export class BillingTransactionDetailVM {
  public FiscalYear: string='';
  public InvoiceNumber: string='';
  public BillingDate: string='';
  public PaymentMode: string='';
  public DepositDeductAmount: number = 0;
  public DepositBalance: number = 0;
  public User: string='';
  public Remarks: string='';
  public PrintCount: number = 0;
}


export class PatientDetailVM {
  public PatientId: number = 0;
  public ShortName: string='';
  public PatientCode: string='';
  public InpatientNo: string='';
  public Address: string='';
  public DateOfBirth: string='';
  public ContactNo: string='';
  public Gender: string='';
  public CountrySubDivision: string='';
  public CountryName: string='';
  public MunicipalityName: string='';
  public WardNumber: number = 0;
  public CountrySubDivisionName: string='';
}

export class AdmissionDetailVM {
  public AdmissionDate: string='';
  public DischargeDate: string='';
  public AdmittingDoctor: string='';
  public Department: string='';
  public RoomType: string='';
  public LengthOfStay: number = 0;
}

export class DepositDetailVM {
  public DepositId: number = 0;
  public RecieptNo: number = 0;
  public Date: string='';
  public Amount: number = 0;
  public Balance: number = 0;
  public TransactionType: string='';
  public ReferenceInvoice: string='';
}

export class DischargeDetailBillingVM {
  public PatientVisitId: number = 0;
  public DischargeDate: string='';
  public BillStatus: string='';
  public Remarks: string='';

  public DischargeDateNepali: NepaliDate = new NepaliDate(); //only used in client side.
  public AdmittedDays: string='';
}

export class PharmacyBillItemVM {
  public ItemId: number = 0;
  public BillDate: string='';
  public ItemName: string='';
  public ItemCode: string='';
  public BatchAndExpiry: string='';
  public SalePrice: number = 0;
  public Quantity: number = 0;
  public SubTotal: number = 0;
  public DiscountAmount: number = 0;
  public VATAmount: number = 0;
  public TotalAmount: number = 0;
  public ServiceDepartmentName: string='';
  public TotalDisAmt: number = 0;
}

export class DischargeSummaryBillItem {
  ServiceDepartmentName: string='';
  SubTotal: number = 0;
  DiscountAmount: number = 0;
  TotalAmount: number = 0;
}





