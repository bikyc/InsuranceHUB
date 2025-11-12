import { Component, ChangeDetectorRef, ElementRef, HostListener, ViewChild, } from '@angular/core';
import { Input, Output, EventEmitter, OnInit } from "@angular/core";
import { NepaliCalendarService } from '../np/nepali-calendar.service';
import {
  NepaliDate, NepaliMonth, NepaliDay, NepaliYear, NepaliHours, NepaliMinutes, NepaliAMPM
} from '../np/nepali-dates';
import moment from 'moment/moment';

@Component({
  selector: "np-calendar-board",
  standalone: false,
  templateUrl: "./nepali-calendar-board.html",
  styleUrls: ['./nepali-calendar-board-stylesheet.css'],
  host: {
    '(document:click)': 'onClick($event)',
  }
})
export class NepaliCalendarBoardComponent {
  @Input("nepaliDate") npDateModel: NepaliDate = new NepaliDate(); //this is passed and is updated on clicking next and previous
  @Output("dateChangeEmitter") dateChangeEmitter: EventEmitter<object> = new EventEmitter<object>();

  public currentMonth: NepaliMonth = new NepaliMonth();
  public currentYear: NepaliYear = new NepaliYear();
  public nepYears: Array<NepaliYear> = [];
  public nepMonths: Array<NepaliMonth> = [];

  public weekListOfSelectedMonth: Array<any> = [];

  public todaysNepaliDate: NepaliDate = new NepaliDate();

  public initiallyEnteredNepaliDate: any; //used for comparing the nepali date that is passed to this component
  public showMonthList: boolean = false;

  public showYearList: boolean = false;  
  public screenHeight: number = 450;
  public fromBottom: number = 0;

  public minHash: number = 0;
  public maxHash: number = 999999999;

  @ViewChild('calendarBoard') el: ElementRef = new ElementRef(null);

  @Input("minimum-date")
  public minValidDate: NepaliDate = new NepaliDate();

  @Input("maximum-date")
  public maxValidDate: NepaliDate = new NepaliDate();

  @Input("sys-min-nepali-year")
  public minYear: number = 0;

  @Input("sys-max-nepali-year")
  public maxYear: number = 0;

  constructor(public npCalendarService: NepaliCalendarService, private eRef: ElementRef,
    public changeDetector: ChangeDetectorRef) {
    this.nepYears = NepaliYear.GetAllNepaliYears();
    this.nepMonths = NepaliMonth.GetNepaliMonths();
    this.todaysNepaliDate = this.npCalendarService.GetTodaysNepDate();
    this.onResize(null);
    
  }

  setMinMaxHash() {
    let dt1 = '';
    let dt2 = '';
    if (this.minValidDate) {
      dt1 = '' + this.minValidDate.Year + (this.minValidDate.Month < 10 ? ('0' + this.minValidDate.Month) : this.minValidDate.Month) + ((this.minValidDate.Day < 10) ? ('0' + this.minValidDate.Day) : this.minValidDate.Day);
      this.minHash = +dt1;
    }
    if (this.maxValidDate) {
      dt2 = '' + this.maxValidDate.Year + (this.maxValidDate.Month < 10 ? ('0' + this.maxValidDate.Month) : this.maxValidDate.Month) + ((this.maxValidDate.Day < 10) ? ('0' + this.maxValidDate.Day) : this.maxValidDate.Day);
      this.maxHash = +dt2;
    }
  }

  ngOnInit() {
    this.setMinMaxHash();
    this.showCalenderView();
    this.initiallyEnteredNepaliDate = Object.assign({}, this.npDateModel);
  }


  ngAfterViewInit() {
    this.fromBottom = this.el.nativeElement.getBoundingClientRect().bottom;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.screenHeight = window.innerHeight - 10; //10 is taken for buffer
     
  }

  onClick(event:any) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.closeBoard();
    }
  }

  public IsValidForSelection(day:number): boolean {    
    let dtmain = '' + this.npDateModel.Year + (this.npDateModel.Month < 10 ? ('0' + this.npDateModel.Month) : this.npDateModel.Month) + ((day < 10) ? ('0' + day) : day);
    let dtmainint = +dtmain;
    if (dtmainint >= this.minHash && dtmainint <= this.maxHash) {
      return true;
    }
    return false;
  }

  public showCalenderView() {
    let nepaliDateString = (this.npDateModel.Year) + '-' + (this.npDateModel.Month) + '-1';
    let englishDate = this.npCalendarService.ConvertNepStringToEngString(nepaliDateString);
    let totalDaysInCurrentMonth = NepaliCalendarService.yr_mth_bs_static[this.npDateModel.Year][this.npDateModel.Month - 1];
    let dayOfWeek = moment(englishDate).day() as unknown as number; //0 is sunday, so 1 is added

    let calDaysArr: Array<any> = [];
    let eachWeek: Array<any> = [];
    for (let i = 0; i < dayOfWeek; i++) {
      eachWeek[i] = 0;
    }

    let totalloop = (totalDaysInCurrentMonth + dayOfWeek);
    if (((totalDaysInCurrentMonth + dayOfWeek) % 7) != 0) {
      totalloop = (totalDaysInCurrentMonth + dayOfWeek) + 7 - ((totalDaysInCurrentMonth + dayOfWeek) % 7);
    }

    for (let i = dayOfWeek; i < totalloop; i++) {
      let rem = (i % 7);
      let singleDate = (((i - dayOfWeek) + 1) > totalDaysInCurrentMonth) ? 0 : ((i - dayOfWeek) + 1);
      let validForClick = singleDate > 0 ? this.IsValidForSelection(singleDate) : false;
      eachWeek[rem] = { value: singleDate, isValid: validForClick };
      if (((i+1) % 7) == 0) {
        calDaysArr.push(eachWeek);
        eachWeek = [];
      }
    } 
    this.weekListOfSelectedMonth = calDaysArr;
    this.currentMonth = this.nepMonths.find(m => m.monthNumber == this.npDateModel.Month) as NepaliMonth;
    this.currentYear = this.nepYears.find(y => y.yearNumber == this.npDateModel.Year) as unknown as NepaliYear; 
  }

  nextMonth() {
    if ((this.npDateModel.Month == 12) && (this.maxYear > this.npDateModel.Year)) {
      this.npDateModel.Year++; this.npDateModel.Month = 1;
    } else {
      this.npDateModel.Month++;
    }
    this.showCalenderView();
  }

  previousMonth() {
    if ((this.npDateModel.Month == 1) && (this.minYear < this.npDateModel.Year)) {
      this.npDateModel.Year--; this.npDateModel.Month = 12;
    } else {
      this.npDateModel.Month--;
    }  
    this.showCalenderView();
  }

  selectDate(selectedDay:number) {
    this.dateChangeEmitter.emit({ changed: true, year: this.currentYear.yearNumber, month: this.currentMonth.monthNumber, day: selectedDay });
  }

  closeBoard() {
    this.dateChangeEmitter.emit({changed: false});
  }

  monthListClicked() {
    if (this.showMonthList) {
      this.showMonthList = false;
      this.showYearList = false;
    } else {
      this.changeDetector.detectChanges();
      this.showMonthList = true;
      this.showYearList = false;
    }
  }

  yearListClicked() {
    if (this.showYearList) {
      this.showYearList = false;
      this.showMonthList = false;
    } else {
      this.changeDetector.detectChanges();
      this.showYearList = true;
      this.showMonthList = false;
    }
  }

  monthSelected(monthnumber:number, e:any = null) {
    this.npDateModel.Month = monthnumber;
    this.showCalenderView();
    this.showMonthList = false;
    this.showYearList = false;
    e.stopPropagation();
  }

  yearSelected(yearnumber: number, e:any = null) {
    this.npDateModel.Year = yearnumber;
    this.showCalenderView();
    this.showYearList = false;
    this.showMonthList = true;
    e.stopPropagation();
  }

  selectToday() {
    this.dateChangeEmitter.emit({ changed: true, year: this.todaysNepaliDate.Year, month: this.todaysNepaliDate.Month, day: this.todaysNepaliDate.Day });
  }

}
