import { Route } from "@angular/router";

export class ClaimRoutes {

    public RouteId: number = 0;
    public UrlFullPath: string = '';
    public DisplayName: string = '';
    public PermissionId: number = 0;
    public ParentRouteId: number = 0;
    public DefaultShow: boolean = false;
    public RouterLink: string = '';
    public Css: string = "";
    public DisplaySeq: number = 0;
    public ChildRoutes: Array<ClaimRoutes> = new Array<ClaimRoutes>();
    public ChildRoutesDefaultShowCount: number = 0;
    public IsSecondaryNavInDropdown: boolean = false;
    public RouteDescription: string = '';

}