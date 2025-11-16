import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class PrinterSettingsModel {

  public PrinterSettingId: number = 0;//make this as identity(1,1), PK.
  public PrintingType: string = 'browser';//available values: [browser,dotmatrix,server] -- make a dropdown in UI.
  public GroupName: string = '';//available values: [bill-receipt,reg-sticker,lab-sticker,phrm-receipt]
  public PrinterDisplayName: string = '';
  public PrinterName: string = '';
  public ModelName: string = '';
  public Width_Lines: number = 0;
  public Height_Lines: number = 0;
  public HeaderGap_Lines: number = 0;
  public FooterGap_Lines: number = 0;
  public mh: number = 0;//this is specific to Dotmatrix>EPSON printer.
  public ml: number = 0;//this is specific to Dotmatrix>EPSON printer.
  public ServerFolderPath: string = '';//specific to server PrintingType='server'
  public Remarks: string = '';
  public CreatedBy: number = 0;
  public CreatedOn: string = '';
  public ModifiedBy: number = 0;
  public ModifiedOn: string = '';
  public IsActive: boolean = true;

}


export enum ENUM_PrintingType {
  browser = "browser",
  dotmatrix = "dotmatrix",
  server = "server",
  receiptDotMatrix = "receipt-dotmatrix"
}

export enum ENUM_PrintType {
  returnInvoice= "return-invoice",
  provisionalInvoice="provisional-invoice"
}

export enum ENUM_PrintingGroupName {
  bill_receipt = "bill-receipt",
  phrm_receipt = "phrm-receipt",
  reg_sticker = "reg-sticker",
  lab_sticker = "lab-sticker"
}

export enum ENUM_PrinterModels {
  LQ_310 = "LQ-310",
  LX_310 = "LX-310"
}