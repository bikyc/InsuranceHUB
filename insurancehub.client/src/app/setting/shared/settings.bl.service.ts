import { Injectable } from '@angular/core';
import { SettingsDLService } from './settings.dl.service';
import { BillingDLService } from '../../shared/shared-services/billing-service/billing.dl.service';

@Injectable()
export class SettingsBLService {


  constructor(public settingsDLService: SettingsDLService, public billingDLService: BillingDLService) {
  }

}
