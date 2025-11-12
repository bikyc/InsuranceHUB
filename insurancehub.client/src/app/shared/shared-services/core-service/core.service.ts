import { Injectable } from "@angular/core";
import { CoreBLService } from "./core-bl.service";
import { MessageboxService } from "../../messagebox/messagebox.service";
import { CFGParameterModel } from "../../models/cfg-parameter.model";

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  public showCalendarADBSButton: boolean = true;
  public showLocalNameFormControl: boolean = true;
  public showCountryMapOnLandingPage: boolean = true;
  public Parameters: Array<CFGParameterModel> = [];
    public DatePreference: string = "np";

  constructor(
    public coreBlService: CoreBLService,
    public msgBoxServ: MessageboxService
  ) { }

  public InitializeParameters() {
    return this.coreBlService.GetParametersList();
  }
  public SetCalendarADBSButton() {
    var calParameter = this.Parameters.find(
      (a) => a.ParameterName == "ShowCalendarADBSButton"
    );
    if (calParameter)
      this.showCalendarADBSButton = JSON.parse(calParameter.ParameterValue);
    else
      this.msgBoxServ.showMessage("error", [
        "Please set showCalendarADBSButton in parameters.",
      ]);
  }
   public getCalenderDatePreference() {
    return this.coreBlService.getCalenderDatePreference();
  }
  public SetCalenderDatePreference(res:any) {
    if (res.Status == "OK") {
      let data = res.Results;
      this.DatePreference = data != null ? data.PreferenceValue : "np"; 
      if (
        this.DatePreference == "" &&
        this.Parameters &&
        this.Parameters.length > 0
      ) {
        let param = this.Parameters.find(
          (p) =>
            p.ParameterName == "CalendarDatePreference" &&
            p.ParameterGroupName.toLowerCase() == "common"
        );
        if (param) {
          let paramValueObj = JSON.parse(param.ParameterValue);
          if (paramValueObj != null) {
            if (paramValueObj.np) {
              this.DatePreference = "np";
            } else {
              this.DatePreference = "en";
            }
          }
        }
      }
    }
  }
  public FocusInputById(targetId: string, waitTimeInMs: number = 100) {
    let timer = window.setTimeout(function () {
      let htmlObject: any = document.getElementById(targetId);
      if (htmlObject) {
        htmlObject.focus();
        let elemType = htmlObject.type;
        //content selection is applied for below content types. Not applicable For other only focus is applied.
        if (
          elemType == "text" ||
          elemType == "number" ||
          elemType == "tel" ||
          elemType == "password"
        ) {
          htmlObject.select();
        }
      }
      clearTimeout(timer);
    }, waitTimeInMs);
  }
}