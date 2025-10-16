import { Component } from '@angular/core';
import { ENUM_HTTPResponses } from './shared/shared-enums';
import { SecurityBLService } from './security/security.bl.service';
import { SecurityService } from './security/security.service';
import { ClaimRoutes } from './security/routes.model';
import { SearchableRoute } from './shared/DTOs/SearchebleRoute.dto';
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
          //  this.securityService.validRouteList[0].ChildRoutes.filter(s => s.DefaultShow == true).length
          this.filteredValidRoutes = _.cloneDeep(this.validRoutes);
          this.GenerateSearchableRoutes(this.filteredValidRoutes);
        }
      },
        err => {
          //alert('failed to get the data.. please check log for details.');
          this.logError(err.ErrorMessage);
        });
  }
  logError(err: any) {
    console.log(err);
  }
GenerateSearchableRoutes(routes: ClaimRoutes[], parentPath: string = '', parentLabel: string = '') {
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
