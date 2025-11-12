import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CreditOrganization_DTO } from '../../shared/DTOs/credit-organization.dto';

@Injectable({
  providedIn: 'root'
})
export class ClaimManagementService {
  private readonly STORAGE_KEY_ACTIVE_ORG = 'activeOrganization';

  private activeOrganizationSubject = new BehaviorSubject<CreditOrganization_DTO | null>(null);
  public activeOrganization$ = this.activeOrganizationSubject.asObservable();
  private _activeInsuranceProvider: CreditOrganization_DTO = new CreditOrganization_DTO();
  public CurrentApiIntegrationName: string = '';
  public IsNGHISSchemeSelected: boolean = false;

  constructor() {
    this.loadActiveOrganization();
  }

  private loadActiveOrganization(): void {
    const storedOrg = sessionStorage.getItem(this.STORAGE_KEY_ACTIVE_ORG);
    if (storedOrg) {
      try {
        const org = JSON.parse(storedOrg);
        this.activeOrganizationSubject.next(org);
      } catch (e) {
        console.error('Failed to load active organization', e);
      }
    }
  }

  setActiveOrganization(org: CreditOrganization_DTO): void {
    this.activeOrganizationSubject.next(org);
    sessionStorage.setItem(this.STORAGE_KEY_ACTIVE_ORG, JSON.stringify(org));
  }

  getActiveOrganization(): CreditOrganization_DTO | null {
    return this.activeOrganizationSubject.value;
  }

  clearActiveOrganization(): void {
    this.activeOrganizationSubject.next(null);
    sessionStorage.removeItem(this.STORAGE_KEY_ACTIVE_ORG);
  }

  isOrganizationActive(): boolean {
    return this.activeOrganizationSubject.value !== null;
  }
  public getActiveInsuranceProvider(): CreditOrganization_DTO {
    return this._activeInsuranceProvider;
  }
  public setActiveInsuranceProvider(currentOrganization: CreditOrganization_DTO) {
    this._activeInsuranceProvider = currentOrganization;
  }
  public removeActiveInsuranceProvider() {
    this._activeInsuranceProvider = new CreditOrganization_DTO();
  }
}