import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PharmacyDLService } from "./pharmacy.dl.service";
import { map } from "rxjs";

@Injectable()
export class PharmacyBLService {
    constructor(private http: HttpClient, private pharmacyDLService: PharmacyDLService) { }
    public GetPatients(searchTxt: string, isInsurance: boolean) {
        return this.pharmacyDLService.GetPatients(searchTxt, isInsurance)
            .pipe(map(res => { return res }));
    }
    public PutPrintCount(printCount: number, invoiceId: number) {
        return this.pharmacyDLService.PutPrintCount(printCount, invoiceId)
            .pipe(map(res => { return res }));
    }
    public GetSaleReturnInvoiceItemsByInvoiceRetId(invoiceReturnId: number) {
        try {
            return this.pharmacyDLService.GetSaleReturnInvoiceItemsByInvoiceRetId(invoiceReturnId)
                .pipe(map(res => { return res }));
        }
        catch (ex) {
            throw ex;
        }
    }
}