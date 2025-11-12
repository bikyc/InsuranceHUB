import { Injectable } from "@angular/core";
import { SecurityDLService } from "./security.dl.service";
import { map, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SecurityBLService {

    constructor(public securityDlService: SecurityDLService) {

    }
public GetAllValidRouteList(UserId:number): Observable<any> {
    return this.securityDlService.GetAllValidRouteList(UserId)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
}