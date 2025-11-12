import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClaimManagementComponent } from './claim-management.component';
import { ScrubbingComponent } from './scrubbing/scrubbing.component';
import { PaymentProcessingComponent } from './payment-processing/payment-processing.component';
import { ReportsComponent } from './reports/reports.component';
import { SelectInsuranceProviderComponent } from './select-insurance-provider/select-insurance-provider.component';
import { ClaimFormsComponent } from './claim-forms/claim-forms.component';
import { ProcessedClaimsComponent } from './processed-claims/processed-claims.component';
import { ClaimDocumentComponent } from './claim-document/claim-document.component';
import { InsServerStatusComponent } from './ins-server-status/ins-server-status.component';
import { InsuranceBillListComponent } from './bill-review/ins-bill-list.component';

const routes: Routes = [
  {
    path: '',
    component: ClaimManagementComponent,
    children: [
      { path: 'BillReview', component: InsuranceBillListComponent },
      { path: 'Scrubbing', component: ScrubbingComponent },
      { path: 'PaymentProcessing', component: PaymentProcessingComponent },
      { path: 'Reports', component: ReportsComponent },
      { path: 'SelectInsuranceProvider', component: SelectInsuranceProviderComponent },
      { path: 'ClaimForms', component: ClaimFormsComponent },
      { path: 'ProcessedClaims', component: ProcessedClaimsComponent },
      { path: 'ClaimDocument', component: ClaimDocumentComponent },
      { path: 'InsServerStatus', component: InsServerStatusComponent },
      { path: '', redirectTo: '', pathMatch: 'full' } // Default route
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClaimManagementRoutingModule {}

