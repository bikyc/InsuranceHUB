import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable()
export class SettingsDLService {

  public options = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })

  };

  public jsonOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(public http: HttpClient) { }

  
}

