import { Router } from "@angular/router";

export class ClaimRoutes {

    public RouteId = 0;
    public UrlFullPath = '';
    public DisplayName = '';
    public PermissionId = 0;
    public ParentRouteId = 0;
    public DefaultShow = false;
    public RouterLink = '';
    public Css = "";
    public DisplaySeq = 0;
    public ChildRoutes: ClaimRoutes[] = new Array<ClaimRoutes>();
    public ChildRoutesDefaultShowCount = 0;
    public IsSecondaryNavInDropdown = false;
    public RouteDescription = '';

}