import { Injectable } from "@angular/core";
import { Routes } from "@angular/router";
import { ClaimRoutes } from "./routes.model";

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  public validRouteList: Array<ClaimRoutes> = new Array<ClaimRoutes>();

  public GetAllValidRoutes(): Array<ClaimRoutes> {
    this.validRouteList.forEach((r) => {
      let re = /\ /gi;
      let result = r.DisplayName.replace(re, "");
      r.DisplayName = result;
    });
    return this.validRouteList;
  }
}