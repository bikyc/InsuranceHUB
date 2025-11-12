import { Injectable } from "@angular/core";
import { CoreDLService } from "./core-dl.service";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CoreBLService {
  constructor(public coreDLService: CoreDLService) { }

  public GetParametersList() {
    return this.coreDLService.GetParametersList().pipe(
      map((res) => res)
    );
  }
  public getCalenderDatePreference() {
    return this.coreDLService.getCalenderDatePreference().pipe(
      map((res) => res)
    );
  }
}
