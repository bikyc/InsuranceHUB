import { Injectable } from "@angular/core";
import { CreditOrganization_DTO } from "./DTOs/CreditOrganization_DTO";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClaimManagementService {
// claim-management.service.ts
private activeOrgSubject = new BehaviorSubject<CreditOrganization_DTO | null>(null);
activeOrg$ = this.activeOrgSubject.asObservable();

SetActiveOrganization(org: CreditOrganization_DTO) {
  this.activeOrgSubject.next(org);
}
}