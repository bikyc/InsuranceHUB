import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class SecurityDLService {
    public options = {
        headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    };

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { 
    }
       public GetAllValidRouteList() {
        return this.http.get<any>(`${this.baseUrl}/api/Security/NavigationRoutes`, this.options);
    }
}