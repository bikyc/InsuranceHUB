import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";

@Injectable()
export class PharmacyDLService {
  public optionJson = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  public options = { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }) };

  constructor(public http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {

  }
  public GetPatients(searchTxt: string = '', isInsurance: boolean = false) {
    return this.http.get<any>(`${this.baseUrl}/api/PharmacySales/GetPatientList?SearchText=${searchTxt}&IsInsurance=${isInsurance}`, this.optionJson);
  }
  public PutPrintCount(printCount: number, invoiceId: number) {
    return this.http.put<any>(`/api/PharmacySales/InvoicePrintCount?printCount=${printCount}&invoiceId=${invoiceId}`, this.options);
  }
  public GetSaleReturnInvoiceItemsByInvoiceRetId(invoiceretid: number) {
    try {
      return this.http.get<any>("/api/PharmacySalesReturn/CreditNoteInfo?invoiceReturnId=" + invoiceretid, this.options);
    }
    catch (ex) {
      throw ex;
    }
  }
   public GetInvoiceReceiptByInvoiceId(invoiceId: number) {
    return this.http.get<any>(`/api/PharmacySales/InvoiceReceiptByInvoiceId?InvoiceId=${invoiceId}`, this.options);
  }
}