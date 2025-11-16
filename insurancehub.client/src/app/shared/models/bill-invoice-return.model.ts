
import moment from 'moment';
import { BillingTransactionItem } from './billing-transaction-items.model';
import { BillInvoiceReturnItemsModel } from './bill-invoice-return-items.model';

export class BillInvoiceReturnModel {
  public BillReturnId: number = 0;
  public CreditNoteNumber: number = 0;
  public RefInvoiceNum: number = 0;
  public PatientId: number = 0;
  public FiscalYearId: number = 0;
  public FiscalYear: string = '';
  public BillingTransactionId: number = 0;
  public SubTotal: number = 0;
  public DiscountAmount: number = 0;
  public TaxableAmount: number = 0;
  public TaxTotal: number = 0;
  public TotalAmount: number = 0;
  public Remarks: string = '';
  public CounterId: number = 0;
  public CreatedBy: number = 0;
  public CreatedOn: string = '';
  public IsActive: boolean = true;
  public IsRemoteSynced: boolean = false;
  public TaxId: number = 0;
  public InvoiceCode: string = '';
  public Tender: number = 0;
  public ReturnedItems: Array<BillingTransactionItem> = [];
  public ReturnInvoiceItems: Array<BillInvoiceReturnItemsModel> = [];

  public PaymentMode: string = '';
  public IsInsuranceBilling: boolean = false;
  public InsuranceProviderId: number = 0;
  public BillStatus: string = '';
  public DiscountReturnAmount: number = 0;
  public DiscountFromSettlement: number = 0;
  public ReturnCashAmount: number = 0;
  public ReturnCreditAmount: number = 0;
  public PriceCategoryId: number = 0;
  public TransactionType: string = "";
  public IsCoPayment: boolean = false;

  public SchemeId: number = 0;
  public OrganizationId: number = 0;
  public ClaimCode: number = 0;
  constructor() {
    this.CreatedOn = moment().format("YYYY-MM-DD HH:mm:ss");
  }
}
