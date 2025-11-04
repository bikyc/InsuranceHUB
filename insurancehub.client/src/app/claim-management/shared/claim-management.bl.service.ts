import { Observable } from "rxjs";
import { ClaimManagementDLService } from "./claim-management.dl.service";
import { InsHTTPResponse } from "../../shared/common-models";
import { Injectable } from "@angular/core";

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
}
