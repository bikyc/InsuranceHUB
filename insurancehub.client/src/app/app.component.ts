import { Component } from '@angular/core';
import { ENUM_HTTPResponses } from './shared/shared-enums';
import { SecurityBLService } from './security/security.bl.service';
import { SecurityService } from './security/security.service';
import { ClaimRoutes } from './security/routes.model';
import { SearchableRoute } from './shared/DTOs/SearchableRoute.dto';
import * as _ from "lodash";

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

  constructor(
    private securityBLService: SecurityBLService,
    private securityService: SecurityService
  ) {
    this.GetAllValidRouteList();
  }
  GetAllValidRouteList(): void {
    this.securityBLService.GetAllValidRouteList()
      .subscribe(res => {
        if (res.Status === ENUM_HTTPResponses.OK) {
          this.securityService.validRouteList = res.Results;
          this.validRoutes = this.securityService.GetAllValidRoutes();
          this.filteredValidRoutes = _.cloneDeep(this.validRoutes);
          this.GenerateSearchableRoutes(this.filteredValidRoutes);
        }
      },
        err => {
          this.logError(err.ErrorMessage);
        });
  }
  logError(err: any) {
    console.log(err);
  }
GenerateSearchableRoutes(routes: ClaimRoutes[], parentPath = '', parentLabel = '') {
    routes.forEach(route => {

      const pathlable = parentLabel ? `${parentLabel} > ${route.DisplayName}` : route.DisplayName;
      const pathParts = route.UrlFullPath.split('/').filter(part => part); // ignore empty strings
      let routeType: 'menu' | 'submenu' | 'page';

      if (pathParts.length === 1) {
        routeType = 'menu';
      } else if (pathParts.length === 2) {
        routeType = 'submenu';
      } else {
        routeType = 'page';
      }

      this.SearchableRoutes.push({
        DisplayName: route.DisplayName,
        FullPath: route.UrlFullPath,
        PathLable: pathlable,
        RouteType: routeType,
        RouteDescription: route.RouteDescription
      });

      if (route.ChildRoutes && route.ChildRoutes.length > 0) {
        this.GenerateSearchableRoutes(route.ChildRoutes, pathlable);
      }
    });
  }
}
