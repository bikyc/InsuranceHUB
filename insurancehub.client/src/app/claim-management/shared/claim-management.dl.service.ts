import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { InsHTTPResponse as InsHTTPResponse } from "../../shared/common-models";
import { Inject, Injectable } from "@angular/core";
import { ClaimBillReviewDTO } from "../../shared/DTOs/claim-bill-review.dto";
import { BillingCreditBillItem_DTO } from "../../shared/DTOs/billing-credit-bill-item.dto";
import { PharmacyCreditBillItem_DTO } from "../../shared/DTOs/pharmacy-credit-bill-item.dto";

@Injectable({
  providedIn: 'root'
})
export class ClaimManagementDLService {
  options = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
  };
  optionJson = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  GetRoutePermissions(): Observable<InsHTTPResponse> {
    return this.http.get<InsHTTPResponse>(`${this.baseUrl}/api/permissions/routes`, this.optionJson);
  }

  GetCreditOrganizationList(): Observable<InsHTTPResponse> {
    return this.http.get<InsHTTPResponse>(`${this.baseUrl}/api/ClaimManagement/InsuranceApplicableCreditOrganizations`, this.optionJson);
  }
  GetClaimReviewList(FromDate: string, ToDate: string, CreditOrganizationId: number, patientId: number): Observable<InsHTTPResponse> {
    return this.http.get<InsHTTPResponse>(`${this.baseUrl}/api/ClaimManagement/BillReview?FromDate=${FromDate}&ToDate=${ToDate}&CreditOrganizationId=${CreditOrganizationId}&PatientId=${patientId}`, this.options);
  }
  UpdateDocumentUpdateStatus(bills: Array<ClaimBillReviewDTO>): Observable<InsHTTPResponse> {
    return this.http.put<InsHTTPResponse>(`${this.baseUrl}/api/ClaimManagement/UpdateDocumentReceivedStatus`, bills, this.optionJson);
  }
  UpdateClaimableStatus(bills: Array<ClaimBillReviewDTO>, claimableStatus: boolean): Observable<InsHTTPResponse> {
    return this.http.put<InsHTTPResponse>(`${this.baseUrl}/api/ClaimManagement/ClaimableStatus?claimableStatus=${claimableStatus}`, bills, this.optionJson);
  }
  UpdateClaimableCode(bills: Array<ClaimBillReviewDTO>, claimCode: number): Observable<InsHTTPResponse> {
    return this.http.put<InsHTTPResponse>(`${this.baseUrl}/api/ClaimManagement/ClaimCode?claimCode=${claimCode}`, bills, this.optionJson);
  }
  CheckClaimCode(claimCode: number, patientVisitId: number, creditOrganizationId: number, ApiIntegrationName: string, PatientId: number): Observable<InsHTTPResponse> {
    return this.http.get<InsHTTPResponse>(`${this.baseUrl}/api/ClaimManagement/IsClaimCodeAvailable?ClaimCode=${claimCode}&PatientVisitId=${patientVisitId}&CreditOrganizationId=${creditOrganizationId}&ApiIntegrationName=${ApiIntegrationName}&PatientId=${PatientId}`, this.options);
  }
  SendBillForClaimScrubbing(bills: Array<ClaimBillReviewDTO>): Observable<InsHTTPResponse> {
    return this.http.post<InsHTTPResponse>(`${this.baseUrl}/api/ClaimManagement/InsuranceClaim`, bills, this.optionJson);
  }
  GetBillingCreditNotesByBillingTransactionId(BillingTransactionId: number): Observable<InsHTTPResponse> {
    return this.http.get<InsHTTPResponse>(`${this.baseUrl}/api/ClaimManagement/BillingCreditNotes?BillingTransactionId=${BillingTransactionId}`, this.options);
  }
  GetPharmacyCreditNotesByInvoiceId(InvoiceId: number): Observable<InsHTTPResponse> {
    return this.http.get<InsHTTPResponse>(`${this.baseUrl}/api/ClaimManagement/PharmacyCreditNotes?InvoiceId=${InvoiceId}`, this.options);
  }
  GetBillingCreditBillItems(BillingTransactionId: number) {
    return this.http.get<any>(`${this.baseUrl}/api/ClaimManagement/BillingCreditBillItems?BillingTransactionId=${BillingTransactionId}`, this.options);
  }
  GetPharmacyCreditBillItems(PharmacyInvoiceId: number) {
    return this.http.get<any>(`${this.baseUrl}/api/ClaimManagement/PharmacyCreditBillItems?PharmacyInvoiceId=${PharmacyInvoiceId}`, this.options);
  }
  UpdateBillingCreditItemClaimableStatus(dto: Partial<BillingCreditBillItem_DTO>): Observable<InsHTTPResponse> {
    return this.http.put<InsHTTPResponse>(
      `${this.baseUrl}/api/ClaimManagement/BillingCreditItemClaimableStatus`,
      dto,
      this.optionJson
    );
  }
  UpdatePharmacyCreditItemClaimableStatus(PharmacyCreditBillItem: Partial<PharmacyCreditBillItem_DTO>): Observable<InsHTTPResponse> {
    return this.http.put<InsHTTPResponse>(`${this.baseUrl}/api/ClaimManagement/PharmacyCreditItemClaimableStatus`, PharmacyCreditBillItem, this.optionJson);
  }
}

