import {
  ChangeDetectorRef, Component, EventEmitter, Injector, Input, OnInit, Output
} from "@angular/core";
import { Router } from "@angular/router";
import { CoreService } from "../../shared-services/core-service/core.service";
import { MessageboxService } from "../../messagebox/messagebox.service";
import { SelectedPatientDto } from "../../DTOs/selected-patient.dto";
import { HibLiveClaimInvoiceDetails } from "../../DTOs/hib-live-claim-invoice-details.dto";
import { InsHTTPResponse } from "../../common-models";
import { ENUM_CreditModule, ENUM_INSHTTPResponseText, ENUM_InvoiceType, ENUM_MessageBox_Status, ENUM_Scheme_ApiIntegrationNames } from "../../shared-enums";
import { BilPrint_VM } from "../../models/bill-print-vm.model";
import { BillingBLService } from "../../shared-services/billing-service/billing.bl.service";

@Component({
  selector: "bil-print-invoice-main",
  templateUrl: "./bil-print-invoice-main.html",
  standalone: false,
})
export class Bil_Print_InvoiceMain_Component implements OnInit {
  @Input("invoiceNumber")
  invoiceNumber: number = 0;

  @Input("fiscalYrId")
  fiscalYrId: number = 0;

  @Input("bil-txn-id")
  inputBillingTxnId: number = 0;

  @Input("redirect-path-after-print")
  redirectUrlPath: string = '';

  @Input("focus-print-btn")
  public focusPrintBtn: boolean = true;

  @Output("print-emitter")
  public printEmitter: EventEmitter<object> = new EventEmitter<object>();

  @Output("dischargeIp")
  public dischargePrint: EventEmitter<object> = new EventEmitter<object>();

  @Input("duplicate-print")
  public isFromDuplicatePrints: boolean = false;

  @Input('from-ADT-prints')
  public isPrintFromADT: boolean = false;

  @Input('from-visit-prints')
  public isPrintFromVisit: boolean = false;

  public invoiceInfoObj: BilPrint_VM = new BilPrint_VM();

  public invoiceType: string = '';
  public isInvoiceFound: boolean = false;

  @Input('discharge-statement-id') DischargeStatementId: number = 0;
  @Input('patient-id') PatientId: number = 0;
  @Input('patient-visit-id') PatientVisitId: number = 0;

  @Input('show-normal-bill') showNormalBill: boolean = false;
  showDischargeStatement: boolean = false;
  @Input('invoice-from')
  public InvoiceFrom: string = "";

  @Input('allow-hib-live-claim')
  public AllowHIBLiveClaim: boolean = false;
  public DischargePrintSettings = {
    ShowDischargeStatementPrint: false,
    ShowDischargeSlipPrint: false
  };
  SelectedLiveClaimPatient = new SelectedPatientDto();
  HibLiveClaimInvoiceDetail = new HibLiveClaimInvoiceDetails();
  ShowHibLiveClaimUI: boolean = false
  HibLiveClaimConfig = { "IsEnabled": false, "EnableManualLiveClaim": false, "EnableAutoLiveClaim": false, "EnableLiveDocumentSubmission": false };

  constructor(
    public changeDetectorRef: ChangeDetectorRef,
    public billingBlService: BillingBLService,
    public router: Router,
    public messageBoxService: MessageboxService,
    public injector: Injector,
    public coreService: CoreService
  ) {
    this.GetBillingHeaderParameter();
    this.GetHibLiveClaimParameter();
  }
  GetHibLiveClaimParameter() {
    const param = this.coreService.Parameters.find(p => p.ParameterGroupName === "GovInsurance" && p.ParameterName === "HIBLiveClaimConfig");
    if (param) {
      this.HibLiveClaimConfig = JSON.parse(param.ParameterValue);
    }
  }

  ngOnInit(): void {
    if (this.fiscalYrId && this.invoiceNumber) {
      this.invoiceType = ''; 

      this.LoadInvoiceForPrint(this.invoiceNumber, this.fiscalYrId, this.inputBillingTxnId);
    }
    if (this.DischargeStatementId && this.PatientId && this.PatientVisitId) {
      this.GetDischargeStatementInfo(this.PatientId, this.DischargeStatementId, this.PatientVisitId)
    }
  }

  LoadInvoiceForPrint(invoiceNo: number, fiscalYrId: number, billingTxnId: number) {
    this.billingBlService
      .GetInvoiceDetailsForDuplicatePrint(invoiceNo, fiscalYrId, billingTxnId)
      .subscribe((res: InsHTTPResponse) => {
        if (res.Status === ENUM_INSHTTPResponseText.OK) {
          this.invoiceInfoObj = res.Results;
          this.isInvoiceFound =
            this.invoiceInfoObj && this.invoiceInfoObj.IsInvoiceFound;
          if (this.isInvoiceFound) {
            this.invoiceType = this.invoiceInfoObj.InvoiceInfo.InvoiceType;
            if (this.invoiceInfoObj.InvoiceInfo.ApiIntegrationName === ENUM_Scheme_ApiIntegrationNames.NGHIS && this.HibLiveClaimConfig && this.HibLiveClaimConfig.IsEnabled && this.HibLiveClaimConfig.EnableManualLiveClaim) {
              this.SelectedLiveClaimPatient.PatientId = this.invoiceInfoObj.PatientInfo.PatientId;
              this.SelectedLiveClaimPatient.PatientCode = this.invoiceInfoObj.PatientInfo.PatientCode;
              this.SelectedLiveClaimPatient.PatientName = this.invoiceInfoObj.PatientInfo.ShortName;
              this.SelectedLiveClaimPatient.PatientVisitId = this.invoiceInfoObj.VisitInfo.PatientVisitId;
              this.SelectedLiveClaimPatient.PerformerId = this.invoiceInfoObj.VisitInfo.ConsultingDoctorId;

              this.HibLiveClaimInvoiceDetail.InvoiceId = this.invoiceInfoObj.InvoiceInfo.BillingTransactionId;
              this.HibLiveClaimInvoiceDetail.ModuleName = ENUM_CreditModule.Billing;
              this.HibLiveClaimInvoiceDetail.ApiIntegrationName = this.invoiceInfoObj.InvoiceInfo.ApiIntegrationName;
              this.HibLiveClaimInvoiceDetail.InvoiceFrom = this.InvoiceFrom;
              this.ShowHibLiveClaimUI = this.AllowHIBLiveClaim;
            }
          }
        }
      });
  }

  DuplicatePrintCallBack(data: any) {
    if (data.Close == "close") {
      this.isInvoiceFound = false;
      this.printEmitter.emit({ Close: "close" });
      this.dischargePrint.emit({ Close: "close" });
    }
  }

  GetDischargeStatementInfo(PatientId: number, DischargeStatementId: number, PatientVisitId: number) {
    this.billingBlService.GetDischrageStatement(PatientId, DischargeStatementId, PatientVisitId).subscribe((res: InsHTTPResponse) => {
      if (res.Status === ENUM_INSHTTPResponseText.OK) {
        this.invoiceInfoObj = res.Results;
        if (this.invoiceInfoObj.InvoiceInfo.TransactionDate === null) {
          this.invoiceInfoObj.InvoiceInfo.TransactionDate = this.invoiceInfoObj.VisitInfo.DischargeDate;
        }
        this.isInvoiceFound = true;
        this.invoiceType = ENUM_InvoiceType.inpatientDischarge;//'ip-discharge';
        this.showDischargeStatement = true;

      }

    });
  }

  public GetBillingHeaderParameter(): void {
    const param = this.coreService.Parameters.find(a => a.ParameterName === 'DischargePrintSettings');
    const paramValue = param ? param.ParameterValue : null;
    if (paramValue)
      this.DischargePrintSettings = JSON.parse(paramValue);
    else
      this.messageBoxService.showMessage(ENUM_MessageBox_Status.Error, ["Please enter parameter values for DischargePrintSettings"]);
  }
}


