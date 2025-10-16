import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class SecurityDLService {
    public options = {
        headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    };

    constructor(public http: HttpClient) {
    }
       public GetAllValidRouteList() {
        return this.http.get<any>("/api/Security/NavigationRoutes", this.options);

    }
}