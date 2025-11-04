import { Injectable } from "@angular/core";
import { ClaimRoutes } from "./routes.model";

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
// security.service.ts
SetLoggedInUserFromToken(token: string) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const user = { UserId: payload.sub, UserName: payload.name };
    localStorage.setItem('currentUser', JSON.stringify(user));
    // Trigger login event if needed
  } catch (e) {
    console.error('Invalid JWT token', e);
  }
}

  public validRouteList: ClaimRoutes[] = new Array<ClaimRoutes>();

  public GetAllValidRoutes(): ClaimRoutes[] {
    this.validRouteList.forEach((r) => {
      const re = / /gi;
      const result = r.DisplayName.replace(re, "");
      r.DisplayName = result;
    });
    return this.validRouteList;
  }
}