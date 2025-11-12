import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class CoreDLService {

    public options = {
        headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    };
    constructor(public http: HttpClient) {
    }

    public GetParametersList() {
        return this.http.get<any>("/api/Parameters", this.options);
    }
       public getCalenderDatePreference() {
        return this.http.get<any>("/api/Core?reqType=get-emp-datepreference");
    }
}