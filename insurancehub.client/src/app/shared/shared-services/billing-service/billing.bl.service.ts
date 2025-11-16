import { Injectable } from "@angular/core";
import { BillingDLService } from "./billing.dl.service";
import { map } from "rxjs";

@Injectable()
export class BillingBLService {
    constructor(public billingDLService: BillingDLService) {
    }
    public GetInvoiceDetailsForDuplicatePrint(invoiceNumber: number, fiscalYrId: number, billingTxnId: number) {
        return this.billingDLService.GetInvoiceDetailsForDuplicatePrint(invoiceNumber, fiscalYrId, billingTxnId)
            .pipe(map((responseData) => {
                return responseData;
            }));

    }
    public GetDischrageStatement(PatientId: number, DischargeStatementId: number, PatientVisitId: number) {
        return this.billingDLService.GetDischargeStatement(PatientId, DischargeStatementId, PatientVisitId).pipe(map(res => res));
    }
      public GetCreditNoteByCreditNoteNo(CreditNoteNo: number, fiscalYrId: number) {
    return this.billingDLService.GetCreditNoteByCreditNoteNo(CreditNoteNo, fiscalYrId)
      .pipe(map((responseData) => {
                return responseData;
            }));

  }
}