export class BillingTransactionCreditStatus{
    public CreditStatusID:number = 0;
    public BillingTransactionId:number = 0;
    public InvoiceNo:number = 0;
    public Liable:string = "";
    public PatientId:number = 0;
    public OrganizationId:number = 0;
    public InvoiceDate:string = "";
    public CreditAmount:number = 0;
    public BalanceAmount:number = 0;
    public CreditStatus:boolean = true;
    public IsActive:boolean = true;
}