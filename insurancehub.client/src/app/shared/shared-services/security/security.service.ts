import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ClaimRoutes } from './routes.model';

import moment from 'moment';
import { NepaliCalendarService } from '../../calendar/np/nepali-calendar.service';
import { AccHospitalInfoVM } from '../../models/acc-hospital-info-vm.model';
import { CommonHospitalInfoVM } from '../../models/common-hospital-info.model';
import { MonthModel } from '../../models/fiscal-year.model';
import { NepaliMonth } from '../../calendar/np/nepali-dates';


@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  private validRouteListSubject = new BehaviorSubject<ClaimRoutes[]>([]);
  public validRouteList$ = this.validRouteListSubject.asObservable();

  constructor(private nepaliCalendarService: NepaliCalendarService) {
    // Load cached routes on service initialization
    this.loadCachedRoutes();
  }

  private loadCachedRoutes(): void {
    const cached = sessionStorage.getItem('validRoutes');
    if (cached) {
      try {
        const routes = JSON.parse(cached);
        this.validRouteListSubject.next(routes);
      } catch (e) {
        console.error('Failed to parse cached routes', e);
      }
    }
  }

  setValidRoutes(routes: ClaimRoutes[]): void {
    this.validRouteListSubject.next(routes);
    // Cache in sessionStorage
    sessionStorage.setItem('validRoutes', JSON.stringify(routes));
  }

  GetAllValidRoutes(): ClaimRoutes[] {
    let routes = this.validRouteListSubject.value;

    // If no routes in memory, try to load from sessionStorage
    if (!routes || routes.length === 0) {
      const cached = sessionStorage.getItem('validRoutes');
      if (cached) {
        try {
          routes = JSON.parse(cached);
          this.validRouteListSubject.next(routes);
        } catch (e) {
          console.error('Failed to parse cached routes', e);
        }
      }
    }

    return routes;
  }

  setCurrentUserId(userId: number): void {
    sessionStorage.setItem('userId', userId.toString());
  }

  getCurrentUserId(): number {
    const userId = sessionStorage.getItem('userId');
    return userId ? +userId : 0;
  }

  clearUserData(): void {
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('validRoutes');
    this.validRouteListSubject.next([]);
  }
  public AccHospitalInfo: AccHospitalInfoVM = new AccHospitalInfoVM();
  public CommonHospitalInfo: CommonHospitalInfoVM = new CommonHospitalInfoVM();
  public INVHospitalInfo: AccHospitalInfoVM = new AccHospitalInfoVM();
  public ModuleNameForFiscalYear: string = "accounting";

  public SetAccHospitalInfo(hospitalInfo: any): void {
    this.AccHospitalInfo = this.FiscalYearListAssignData(hospitalInfo);
  }
  public GetAccHospitalInfo(): AccHospitalInfoVM {
    return this.AccHospitalInfo;
  }
  //this function will assign proper data to list as per month details
  public FiscalYearListAssignData(hospitalMasterData: AccHospitalInfoVM) {
    if (this.ModuleNameForFiscalYear.length > 0 && hospitalMasterData && hospitalMasterData.FiscalYearList.length > 0) {
      hospitalMasterData.FiscalYearList.map(f => {

        f.StartDate = moment(f.StartDate).format("YYYY-MM-DD");
        f.EndDate = moment(f.EndDate).format("YYYY-MM-DD");

        f.NepaliFiscalYearName = f.FiscalYearName;
        f.EnglishFiscalYearName = moment(f.StartDate).format("YYYY") + '/' + moment(f.EndDate).format("YYYY");
        f.nStartDate = this.nepaliCalendarService.ConvertEngToNepDateString(f.StartDate);
        f.nEndDate = this.nepaliCalendarService.ConvertEngToNepDateString(f.EndDate);

        let IsCurrentFY = (f.FiscalYearId == hospitalMasterData.CurrFiscalYear.FiscalYearId) ? true : false;
        let startDate = moment(f.StartDate, "YYYY-M-DD");
        let endDate = moment(f.EndDate, "YYYY-M-DD").endOf("month");
        f.EnglishMonthList = new Array<MonthModel>();
        while (startDate.isBefore(endDate)) {
          let monthModel = new MonthModel();
          monthModel.MonthName = startDate.format("YYYY-MMM");
          monthModel.FirstDay = (moment(moment(f.StartDate, "YYYY-M-DD"), "YYYY-MMM") == moment(startDate, "YYYY-MMM")) ? moment(f.StartDate).format("YYYY-MM-DD") : moment(startDate).startOf('month').format('YYYY-MM-DD');
          monthModel.LastDay = (moment(moment(f.EndDate, "YYYY-M-DD"), "YYYY-MMM") == moment(startDate, "YYYY-MMM")) ? moment(f.EndDate).format("YYYY-MM-DD") : moment(startDate).endOf('month').format("YYYY-MM-DD");
          monthModel.MonthNumber = parseInt(startDate.format("MM"));
          if (IsCurrentFY) {
            let afterMonth = moment(startDate.format("YYYY-MM-DD")).isAfter(moment(hospitalMasterData.TodaysDate).format("YYYY-MM-DD"), 'month');
            monthModel.IsDisabled = (afterMonth == true) ? true : false;
            if (startDate.format("YYYY-MMM") == moment(hospitalMasterData.TodaysDate).format("YYYY-MMM")) {
              monthModel.LastDay = moment(hospitalMasterData.TodaysDate).format("YYYY-MM-DD");
            }
          }
          f.EnglishMonthList.push(monthModel);
          startDate = startDate.add(1, "month");
          //console.log("start date:"+startDate.format("YYYY-MM-DD"));
        };
        let nepaliMonthList = NepaliMonth.GetNepaliMonths();
        let nepSD = this.nepaliCalendarService.ConvertEngToNepDate(f.StartDate);
        let nepED = this.nepaliCalendarService.ConvertEngToNepDate(f.EndDate);
        //console.log("FStartDate:"+f.StartDate +" NpStartDate:"+nepSD+" FEndDate:"+f.EndDate +"NpEndDate:"+nepED);
        let nepToday = this.nepaliCalendarService.ConvertEngToNepDate(hospitalMasterData.TodaysDate);
        let fsYear = nepSD.Year;
        let fsMonth = nepSD.Month;
        f.NepaliMonthList = new Array<MonthModel>();

        while (fsYear <= nepED.Year) {
          let npMonthModel = new MonthModel();
          if ((fsMonth <= nepaliMonthList.length && fsYear == nepSD.Year) || (fsMonth <= nepED.Month && fsYear == nepED.Year)) {
            const month = nepaliMonthList.find(m => m.monthNumber == fsMonth);
            npMonthModel.MonthName = fsYear.toString() + "-" + (month ? month.monthName : "");
            let d = this.nepaliCalendarService.GetStartEndDatesOfNepaliMonth_InEngFormat(fsYear, fsMonth);
            let s = this.nepaliCalendarService.ConvertEngToNepDate(d.StartDate);
            let e = this.nepaliCalendarService.ConvertEngToNepDate(d.EndDate);
            npMonthModel.FirstDay = d.StartDate;
            npMonthModel.LastDay = d.EndDate;
            npMonthModel.MonthNumber = fsMonth;
            f.NepaliMonthList.push(npMonthModel);
            if (IsCurrentFY) {
              let afterMonth = moment(moment(npMonthModel.FirstDay).format("YYYY-MM-DD")).isAfter(moment(hospitalMasterData.TodaysDate).format("YYYY-MM-DD"));
              npMonthModel.IsDisabled = (afterMonth == true) ? true : false;
              const month = nepaliMonthList.find(m => m.monthNumber == fsMonth);
              npMonthModel.MonthName = fsYear.toString() + "-" + (month ? month.monthName : "");
              {
                npMonthModel.LastDay = moment(hospitalMasterData.TodaysDate).format("YYYY-MM-DD");
              }
            }
          }
          if (fsMonth <= nepaliMonthList.length && fsYear == nepSD.Year) {
            fsMonth = fsMonth + 1;
          } else if (fsMonth <= nepED.Month && fsYear == nepED.Year) {
            fsMonth = fsMonth + 1;
          } else if (fsMonth > nepaliMonthList.length && fsYear == nepSD.Year) {
            fsMonth = 1;
            fsYear = nepED.Year;
          } else if ((fsMonth > nepaliMonthList.length || fsMonth > nepED.Month) && fsYear == nepED.Year) {
            fsYear = nepED.Year + 1;
          }
        }
      });
      return hospitalMasterData;
    }
    else {
      return new AccHospitalInfoVM();
    }

  }
}