import { Injectable } from "@angular/core";
import { SecurityDLService } from "./security.dl.service";
import { map, Observable } from "rxjs";

@Injectable()
export class SecurityBLService {

    constructor(public securityDlService: SecurityDLService) {

    }
public GetAllValidRouteList(): Observable<any> {
    return this.securityDlService.GetAllValidRouteList()
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
}