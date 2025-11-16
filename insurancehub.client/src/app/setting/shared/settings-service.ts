import { Injectable } from '@angular/core';
import { CoreService } from '../../shared/shared-services/core-service/core.service';
import { SecurityService } from '../../shared/shared-services/security/security.service';



@Injectable()
export class SettingsService {
  public settingsGridCols: SettingsGridColumnSettings;

  constructor(public coreService: CoreService, public securityService: SecurityService) {
    this.settingsGridCols = new SettingsGridColumnSettings(this.coreService.taxLabel, this.securityService)
  }
}
