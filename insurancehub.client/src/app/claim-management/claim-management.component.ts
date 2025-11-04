import { ActivatedRoute, Router } from '@angular/router';
import { CreditOrganization_DTO } from './shared/DTOs/CreditOrganization_DTO';
import { ClaimManagementService } from './shared/claim-management.service';
import { ClaimManagementBLService } from './shared/claim-management.bl.service';
import { SecurityService } from '../security/security.service';
import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { InsHTTPResponse } from '../shared/common-models';

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
    // this.handleSsoFromDanphe();   
    this.loadCreditOrganizations();
    this.GetValidRoutes();
  }
  private GetValidRoutes(): void {
    this.ValidRoutes = this.securityService.GetAllValidRoutes();
  }
  // private handleSsoFromDanphe(): void {
  //   this.route.queryParams.subscribe(params => {
  //     const token = params['token'];
  //     const userId = params['userId'];

  //     if (token && userId) {
  //       localStorage.setItem('loginJwtToken', token);
  //       localStorage.setItem('currentUserId', userId);
  //       this.securityService.SetLoggedInUserFromToken(token);

  //       // Remove token from address bar
  //       this.router.navigate(['/ClaimManagement'], {
  //         replaceUrl: true,
  //         queryParams: {}
  //       });

  //       console.log('SSO login successful');
  //     }
  //   });
  // }

  private loadCreditOrganizations(): void {
    this.claimBL.GetCreditOrganizationList().subscribe({
      next: (res: InsHTTPResponse) => {
        if (res.Status === "Ok" && res.Result?.length) {
          this.ActiveOrganizationList = res.Result;
          // this.isOrganizationActivated = true;
          // this.claimService.SetActiveOrganization(this.ActiveOrganizationList);
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

  ActivateOrganization(org: any) {
    this.ActiveOrganization = org;
    this.isOrganizationActivated = true;
    // optionally save to service if needed
    // this.claimService.SetActiveOrganization(org);
  }

  DeactivateOrganization() {
    this.isOrganizationActivated = false;
    this.ActiveOrganization = new CreditOrganization_DTO();
  }
}