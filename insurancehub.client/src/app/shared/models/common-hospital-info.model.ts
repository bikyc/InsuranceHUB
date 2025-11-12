import { FiscalYearModel } from "./fiscal-year.model";

export class CommonHospitalInfoVM {
    public ActiveHospitalId: number = 0;
    public FiscalYearList: Array<FiscalYearModel> = [];
    public TodaysDate: string = '';
    public CurrFiscalYear: FiscalYearModel = new FiscalYearModel();
}