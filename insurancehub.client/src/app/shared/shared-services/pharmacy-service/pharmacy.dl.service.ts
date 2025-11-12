import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";

@Injectable()
export class PharmacyDLService {
    public optionJson = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    constructor(public http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {

    }
     public GetPatients(searchTxt: string = '', isInsurance: boolean = false) {
    return this.http.get<any>(`${this.baseUrl}/api/PharmacySales/GetPatientList?SearchText=${searchTxt}&IsInsurance=${isInsurance}`, this.optionJson);
  }
}