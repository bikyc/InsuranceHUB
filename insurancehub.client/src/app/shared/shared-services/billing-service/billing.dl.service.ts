import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CoreService } from "../core-service/core.service";
import { SecurityService } from "../security/security.service";

@Injectable()
export class BillingDLService {
    public options = {
        headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    };
    public jsonOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    constructor(public http: HttpClient, public coreService: CoreService, public securityService: SecurityService) {
    }
    public GetInvoiceDetailsForDuplicatePrint(invoiceNumber: number, fiscalYrId: number, billingTxnId: number) {
        return this.http.get<any>("/api/Billing/InvoiceInfo?invoiceNo=" + invoiceNumber + "&fiscalYearId=" + fiscalYrId + "&billingTransactionId=" + billingTxnId, this.options);
    }
    public GetDischargeStatement(PatientId: number, DischargeStatementId: number, PatientVisitId: number) {
        return this.http.get<any>(`/api/DischargeBilling/StatementInfo?patientId=${PatientId}&dischargeStatementId=${DischargeStatementId}&patientVisitId=${PatientVisitId}`, this.options);
    }
    public GetCreditNoteByCreditNoteNo(CreditNoteNo: number, fiscalYrId: number) {
        return this.http.get<any>("/api/BillReturn?reqType=CreditNoteByCreditNoteNo" + "&CreditNoteNo=" + CreditNoteNo + "&fiscalYrId=" + fiscalYrId, this.options);
    }

}