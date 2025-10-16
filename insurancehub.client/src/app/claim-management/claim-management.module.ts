import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClaimManagementComponent } from './claim-management.component';
import { ClaimManagementRoutingModule } from './claim-management-routing.module';
import { ClaimManagementBLService } from './shared/claim-management.bl.service';
import { ClaimManagementDLService } from './shared/claim-management.dl.service';
import { SecurityService } from '../security/security.service';

@NgModule({
  declarations: [ClaimManagementComponent],
  imports: [
    CommonModule,
    ClaimManagementRoutingModule,
  ],
  providers: [
    ClaimManagementBLService,
    ClaimManagementDLService
  ]
})
export class ClaimManagementModule { }
