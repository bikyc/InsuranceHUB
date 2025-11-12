import { FiscalYearModel } from "./fiscal-year.model";

export class AccHospitalInfoVM {
    public ActiveHospitalId: number = 0;
    public FiscalYearList: Array<FiscalYearModel> = [];
    public SectionList: Array<SectionModel> = [];
    public TodaysDate: string = '';

    //below properties are only for client side..
    public HospitalShortName: string = '';
    public HospitalLongName: string = '';
    public TotalHospitalPermissionCount: number = 0;
    public CurrFiscalYear: FiscalYearModel = new FiscalYearModel();
}
export class SectionModel {

  public SectionId: number = 0;
  public SectionName: string='';;
  public SectionCode: string='';;
  public IsDefault: boolean = false;
  public IsActive: boolean = true;
}