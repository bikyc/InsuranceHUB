import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DanpheHTTPResponse } from "../../shared/common-models";

@Injectable()
export class ClaimManagementDLService {
  options = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
  };
  optionJson = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  constructor(
    public http: HttpClient,
  ) { }

  GetRoutePermissions(): Observable<DanpheHTTPResponse> {
    return this.http.get<DanpheHTTPResponse>('/api/permissions/routes', this.optionJson);
  }
}
