import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClaimManagementComponent } from './claim-management.component';
import { ClaimManagementRoutingModule } from './claim-management-routing.module';
import { ScrubbingComponent } from './scrubbing/scrubbing.component';
import { PaymentProcessingComponent } from './payment-processing/payment-processing.component';
import { ReportsComponent } from './reports/reports.component';
import { SelectInsuranceProviderComponent } from './select-insurance-provider/select-insurance-provider.component';
import { ClaimFormsComponent } from './claim-forms/claim-forms.component';
import { ProcessedClaimsComponent } from './processed-claims/processed-claims.component';
import { ClaimDocumentComponent } from './claim-document/claim-document.component';
import { InsServerStatusComponent } from './ins-server-status/ins-server-status.component';
import { InsuranceBillListComponent } from './bill-review/ins-bill-list.component';
import { InsBillPreviewComponent } from './bill-review/ins-bill-preview.component';
import { FormsModule } from '@angular/forms';
import { DanpheAutoCompleteModule } from '../shared/danphe-autocomplete/danphe-auto-complete.module';
import { DanpheConfirmationDialogModule } from '../shared/danphe-confirmation-dialog/danphe-confirmation-dialog.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ClaimManagementComponent,
    InsuranceBillListComponent,
    InsBillPreviewComponent,
    ScrubbingComponent,
    PaymentProcessingComponent,
    ReportsComponent,
    SelectInsuranceProviderComponent,
    ClaimFormsComponent,
    ProcessedClaimsComponent,
    ClaimDocumentComponent,
    InsServerStatusComponent,
    ],
  imports: [
    ClaimManagementRoutingModule,
    SharedModule,
    CommonModule,
    FormsModule,
    DanpheAutoCompleteModule,
    DanpheConfirmationDialogModule
  ]
})
export class ClaimManagementModule { }
