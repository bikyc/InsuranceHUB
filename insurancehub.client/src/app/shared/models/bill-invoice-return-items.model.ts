import moment from "moment";

export class BillInvoiceReturnItemsModel {
    public BillReturnItemId: number = 0;
    public BillReturnId: number = 0;
    public BillingTransactionItemId: number = 0;
    public BillingTransactionId: number = 0; 
    public PatientId: number = 0; 
    public ServiceDepartmentId: number = 0; 
    public ServiceItemId: number = 0; 
    public ItemName: string = "";
    public Price: number = 0;
    public RetQuantity: number = 0;
    public RetSubTotal: number = 0;
    public RetDiscountAmount: number = 0;
    public RetTaxAmount: number = 0;
    public RetTotalAmount: number = 0;
    public RetDiscountPercent: number = 0;
    public PrescriberId: number = 0;
    public PerformerId: number = 0;
    public BillStatus: string = '';
    public RequisitionId: number = 0;
    public RequisitionDate: string = '';
    public RetCounterId: number = 0;
    public RetRemarks: string = '';
    public RequestedBy: number = 0;
    public PatientVisitId: number = 0;
    public BillingPackageId: number = 0;
    public CreatedBy: number = 0;
    public CreatedOn: string = '';
    public BillingType: string = '';
    public RequestingDeptId: number = 0;
    public VisitType: string = '';
    public PriceCategory: string = '';
    public PriceCategoryId: number = 0;
    public PatientInsurancePackageId: number = 0;
    public IsInsurance: boolean = false;
    public DiscountSchemeId: number = 0;
    public IsCashBillSyncToAcc: boolean = false;
    public IsCreditBillSyncToAcc: boolean = false;
    public LabTypeName: string = '';
    constructor() {
        this.CreatedOn = moment().format("YYYY-MM-DD HH:mm:ss");
    }

}

