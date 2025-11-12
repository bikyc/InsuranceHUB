import { map, Observable } from "rxjs";
import { ClaimManagementDLService } from "./claim-management.dl.service";
import { InsHTTPResponse } from "../../shared/common-models";
import { Injectable } from "@angular/core";
import { ClaimBillReviewDTO } from "../../shared/DTOs/claim-bill-review.dto";
import { BillingCreditBillItem_DTO } from "../../shared/DTOs/billing-credit-bill-item.dto";
import { PharmacyCreditBillItem_DTO } from "../../shared/DTOs/pharmacy-credit-bill-item.dto";
import _ from "lodash";

@Injectable({
  providedIn: 'root'
})

export class ClaimManagementBLService {

  constructor(
    private claimManagementDLService: ClaimManagementDLService
  ) { }

  GetRoutePermissions(): Observable<InsHTTPResponse> {
    return this.claimManagementDLService.GetRoutePermissions();
  }
  GetCreditOrganizationList(): Observable<InsHTTPResponse> {
    return this.claimManagementDLService.GetCreditOrganizationList();
  }
    GetBillReviewList(FromDate: string, ToDate: string, CreditOrganizationId: number, patientId: number) {
    return this.claimManagementDLService.GetClaimReviewList(FromDate, ToDate, CreditOrganizationId, patientId)
      .pipe(map(res => res));
  }
    UpdateDocumentUpdateStatus(bills: Array<ClaimBillReviewDTO>) {
    return this.claimManagementDLService.UpdateDocumentUpdateStatus(bills)
      .pipe(map(res => { return res }));
  }
    UpdateClaimableStatus(bills: Array<ClaimBillReviewDTO>, claimableStatus: boolean) {
    return this.claimManagementDLService.UpdateClaimableStatus(bills, claimableStatus)
      .pipe(map(res => { return res }));
  }
    UpdateClaimableCode(bills: Array<ClaimBillReviewDTO>, claimCode: number) {
    return this.claimManagementDLService.UpdateClaimableCode(bills, claimCode)
      .pipe(map(res => { return res }));
  }
    CheckClaimCode(claimCode: number, patientVisitId: number, creditOrganizationId: number, ApiIntegrationName: string, patientId: number) {
    return this.claimManagementDLService.CheckClaimCode(claimCode, patientVisitId, creditOrganizationId, ApiIntegrationName, patientId)
      .pipe(map(res => { return res }));
  }
    SendBillForClaimScrubbing(bills: Array<ClaimBillReviewDTO>) {
    return this.claimManagementDLService.SendBillForClaimScrubbing(bills)
      .pipe(map(res => { return res }));
  }
    GetBillingCreditNotesByBillingTransactionId(BillingTransactionId: number) {
    return this.claimManagementDLService.GetBillingCreditNotesByBillingTransactionId(BillingTransactionId)
      .pipe(map(res => { return res }));
  }
    GetPharmacyCreditNotesByInvoiceId(InvoiceId: number) {
    return this.claimManagementDLService.GetPharmacyCreditNotesByInvoiceId(InvoiceId)
      .pipe(map(res => { return res }));
  }
    GetBillingCreditBillItems(BillingTransactionId: number) {
    return this.claimManagementDLService.GetBillingCreditBillItems(BillingTransactionId)
      .pipe(map(res => { return res }));
  }
  
  GetPharmacyCreditBillItems(PharmacyInvoiceId: number) {
    return this.claimManagementDLService.GetPharmacyCreditBillItems(PharmacyInvoiceId)
      .pipe(map(res => { return res }));
  }
   UpdateBillingCreditItemClaimableStatus(BillingCreditBillItem: BillingCreditBillItem_DTO) {
    let temp = _.omit(BillingCreditBillItem, ['ItemName', 'Quantity', 'TotalAmount']);
    return this.claimManagementDLService.UpdateBillingCreditItemClaimableStatus(temp)
      .pipe(map(res => { return res }));
  }
    UpdatePharmacyCreditItemClaimableStatus(PharmacyCreditBillItem: PharmacyCreditBillItem_DTO) {
    let temp = _.omit(PharmacyCreditBillItem, ['ItemName', 'Quantity', 'TotalAmount']);
    return this.claimManagementDLService.UpdatePharmacyCreditItemClaimableStatus(temp)
      .pipe(map(res => { return res }));
  }
}
