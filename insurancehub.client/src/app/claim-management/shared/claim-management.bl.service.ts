import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ClaimManagementDLService } from "./claim-management.dl.service";
import { DanpheHTTPResponse } from "../../shared/common-models";

@Injectable()

export class ClaimManagementBLService {

  constructor(
    private claimManagementDLService: ClaimManagementDLService
  ) { }

  GetRoutePermissions(): Observable<DanpheHTTPResponse> {
    return this.claimManagementDLService.GetRoutePermissions();
  }
}
