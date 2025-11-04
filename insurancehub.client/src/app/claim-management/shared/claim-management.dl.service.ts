import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { InsHTTPResponse as InsHTTPResponse } from "../../shared/common-models";
import { Inject, Injectable } from "@angular/core";

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
}

