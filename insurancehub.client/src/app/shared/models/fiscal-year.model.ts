
export class FiscalYearModel {
    public FiscalYearId: number = 0;
    public FiscalYearName: string='';;
    public NpFiscalYearName: string ='';
    public StartDate: string='';;
    public EndDate: string='';;
    public Description: string='';;
    public CreatedBy: number = 0;
    public CreatedOn: string='';;
    public IsActive: boolean = true;
    public ClosedBy: number = 0;
    public ClosedOn: string='';;
    public IsClosed: boolean = true;
    public ClosedByName: string='';;
    public ReadyToClose: boolean = false;
    public nStartDate: string='';;
    public nEndDate: string='';;    
    public Remark:string = "";
    public showreopen: boolean = true;
    public EnglishFiscalYearName: string='';;
    public NepaliFiscalYearName: string ='';
    public EnglishMonthList:Array<MonthModel>= new Array<MonthModel>();
    public NepaliMonthList:Array<MonthModel>= new Array<MonthModel>();
  
}

export class MonthModel{
    public MonthName:string='';;
    public MonthNumber:number=0;
    public FirstDay:string='';;
    public LastDay:string='';;
    public IsDisabled:boolean=false;
}
