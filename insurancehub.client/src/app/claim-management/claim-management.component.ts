import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreditOrganization_DTO } from './shared/DTOs/CreditOrganization_DTO';
import { ClaimManagementService } from './shared/claim-management.service';
import { ClaimManagementBLService } from './shared/claim-management.bl.service';

@Component({
  selector: 'app-claim-management',
  standalone: false,
  templateUrl: './claim-management.component.html',
  styleUrl: './claim-management.component.css'
})
export class ClaimManagementComponent {
  public isOrganizationActivated: boolean = false;
  public activeOrganization: CreditOrganization_DTO = new CreditOrganization_DTO;


  constructor(
    private claimManagementService: ClaimManagementService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private claimManagementBLService: ClaimManagementBLService
  ) { 
    
  
  }

  
  

}
