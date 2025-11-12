import { Component } from '@angular/core';
import { ENUM_HTTPResponses } from './shared/shared-enums';

import { SearchableRoute } from './shared/DTOs/SearchableRoute.dto';
import * as _ from "lodash";
import { ActivatedRoute } from '@angular/router';
import { ClaimRoutes } from './shared/shared-services/security/routes.model';
import { SecurityBLService } from './shared/shared-services/security/security.bl.service';
import { SecurityService } from './shared/shared-services/security/security.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  allRoutes: string[] = [];
  permissions: string[] = [];
  validRoutes: ClaimRoutes[] = [];
  validRouteList: ClaimRoutes[] = [];
  filteredValidRoutes: ClaimRoutes[] = [];
  SearchableRoutes: SearchableRoute[] = [];
  UserId: number=0;

  constructor(
    private securityBLService: SecurityBLService,
    private securityService: SecurityService,
    private route: ActivatedRoute
  ) {
    this.initializeUser();
  }

  private initializeUser(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const userIdFromQuery = urlParams.get('userId');
    
    if (userIdFromQuery) {
      // User ID from URL - fresh login
      this.UserId = +userIdFromQuery;
      this.securityService.setCurrentUserId(this.UserId);
      this.GetAllValidRouteList();
    } else {
      // Try to get from sessionStorage - page refresh or navigation
      this.UserId = this.securityService.getCurrentUserId();
      
      if (this.UserId) {
        // Check if we already have valid routes cached
        this.validRoutes = this.securityService.GetAllValidRoutes();
        
        if (!this.validRoutes || this.validRoutes.length === 0) {
          // Routes not cached, fetch them
          this.GetAllValidRouteList();
        } else {
          // Routes are cached, no need to fetch
          console.log('Using cached valid routes');
        }
      } else {
        console.warn('No user ID found. User may need to login.');
      }
    }
  }

  GetAllValidRouteList(): void {
    this.securityBLService.GetAllValidRouteList(this.UserId)
      .subscribe(res => {
        if (res.Status === ENUM_HTTPResponses.OK) {
          this.securityService.setValidRoutes(res.Result);
          this.validRoutes = this.securityService.GetAllValidRoutes();
          // this.filteredValidRoutes = _.cloneDeep(this.validRoutes);
          // this.GenerateSearchableRoutes(this.filteredValidRoutes);
        }
      },
        err => {
          this.logError(err.ErrorMessage);
        });
  }

  logError(err: any) {
    console.log(err);
  }
}