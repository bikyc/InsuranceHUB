import { CommonModule, HashLocationStrategy, LocationStrategy } from "@angular/common";
import { BillingDLService } from "../shared/shared-services/billing-service/billing.dl.service";
import { SettingsService } from "./shared/settings-service";
import { SettingsBLService } from "./shared/settings.bl.service";
import { SettingsDLService } from "./shared/settings.dl.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { DanpheAutoCompleteModule } from "../shared/danphe-autocomplete";
import { SharedModule } from "../shared/shared.module";
import { NgModule } from "@angular/core";

@NgModule({
  providers: [
    SettingsDLService,
    SettingsBLService,
    BillingDLService,
    SettingsService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    DanpheAutoCompleteModule,
    SharedModule,

  ],
  declarations: [
  ],
  bootstrap: []
})

export class SettingsModule { }
