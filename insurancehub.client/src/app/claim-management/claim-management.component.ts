import { ActivatedRoute, Router } from '@angular/router';
import { CreditOrganization_DTO } from '../shared/DTOs/credit-organization.dto';
import { ClaimManagementService } from './shared/claim-management.service';
import { ClaimManagementBLService } from './shared/claim-management.bl.service';
import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { InsHTTPResponse } from '../shared/common-models';
import { SecurityService } from '../shared/shared-services/security/security.service';

@Component({
  selector: 'app-claim-management',
  standalone: false,
  templateUrl: './claim-management.component.html',
  styleUrls: ['./claim-management.component.css']
})
export class ClaimManagementComponent implements OnInit {

  public isOrganizationActivated = false;
  public ActiveOrganizationList: CreditOrganization_DTO[] = [];
  public ActiveOrganization: CreditOrganization_DTO = new CreditOrganization_DTO();
  public ValidRoutes: any[] = [];
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private securityService: SecurityService,
    private claimBL: ClaimManagementBLService,
    private claimService: ClaimManagementService
  ) { }

  ngOnInit(): void {
    this.GetValidRoutes();
    this.loadCreditOrganizations();
    this.restoreActiveOrganization();
  }

  private GetValidRoutes(): void {
    const cachedRoutes = this.securityService.GetAllValidRoutes();
    if (cachedRoutes && cachedRoutes.length > 0) {
      this.ValidRoutes = cachedRoutes;
    }

    this.securityService.validRouteList$.subscribe(routes => {
      if (routes && routes.length > 0) {
        this.ValidRoutes = routes;
      }
    });
  }

  private loadCreditOrganizations(): void {
    this.claimBL.GetCreditOrganizationList().subscribe({
      next: (res: InsHTTPResponse) => {
        if (res.Status === "Ok" && res.Results?.length) {
          this.ActiveOrganizationList = res.Results;
          this.restoreActiveOrganization();
        } else {
          this.isOrganizationActivated = false;
          console.warn('No credit organizations returned');
        }
      },
      error: err => {
        console.error('Failed to load organizations', err);
        this.isOrganizationActivated = false;
      }
    });
  }

  private restoreActiveOrganization(): void {
    const storedOrg = this.claimService.getActiveOrganization();
    
    if (storedOrg && this.ActiveOrganizationList.length > 0) {
      const orgExists = this.ActiveOrganizationList.some(
        org => org.OrganizationId === storedOrg.OrganizationId
      );
      
      if (orgExists) {
        this.ActiveOrganization = storedOrg;
        this.isOrganizationActivated = true;
      } else {
        // Organization no longer exists, clear it
        this.claimService.clearActiveOrganization();
      }
    }
  }

  ActivateOrganization(org: CreditOrganization_DTO) {
    this.ActiveOrganization = org;
    this.isOrganizationActivated = true;
    this.claimService.setActiveOrganization(org);
  }

  DeactivateOrganization() {
    this.ActiveOrganization = new CreditOrganization_DTO();
    this.isOrganizationActivated = false;
    this.claimService.clearActiveOrganization();
  }
}