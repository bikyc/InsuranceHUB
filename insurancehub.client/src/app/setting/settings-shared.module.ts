import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SettingsService } from "./shared/settings-service";
import { SettingsBLService } from "./shared/settings.bl.service";
import { SettingsDLService } from "./shared/settings.dl.service";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { DanpheAutoCompleteModule } from "../shared/danphe-autocomplete";
import { PrinterSelectComponent } from "./printers/printer-select.component";
import { NgModule } from "@angular/core";

@NgModule({
  providers: [
    SettingsBLService,
    SettingsDLService,
    SettingsService
  ],

  imports: [ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule,
    DanpheAutoCompleteModule,
  ],

  declarations: [
    PrinterSelectComponent,
  ],

  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    PrinterSelectComponent,
    DanpheAutoCompleteModule,

  ]
})
export class SettingsSharedModule {


}
