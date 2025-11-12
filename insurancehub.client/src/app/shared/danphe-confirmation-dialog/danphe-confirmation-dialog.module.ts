import { NgModule } from '@angular/core';
import { DanpheConfirmationDialogComponent } from './danphe-confirmation-dialog.component';
import { DanpheConfirmationDirective } from './danphe-confirmation.directive';

@NgModule({
  imports: [
    DanpheConfirmationDialogComponent,
    DanpheConfirmationDirective
  ],
  exports: [
    DanpheConfirmationDialogComponent,
    DanpheConfirmationDirective
  ]
})
export class DanpheConfirmationDialogModule { }

