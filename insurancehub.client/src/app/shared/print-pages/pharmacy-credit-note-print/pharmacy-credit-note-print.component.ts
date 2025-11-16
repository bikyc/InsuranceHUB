import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from "@angular/core";
import { PharmacyCreditNotePrint_DTO } from "./pharmacy-credit-note-print.dto";
import { PrinterSettingsModel } from "../../../setting/printers/select-printer/printer-settings.model";
import { CustomLabelsConfig } from "../../models/custom-labels-config.dto";
import { PharmacyBLService } from "../../shared-services/pharmacy-service/pharmacy.bl.service";
import { MessageboxService } from "../../messagebox/messagebox.service";
import { AppliedTax, TaxationGroupDto, TaxationSubGroupDto, TaxationTypeDto } from "../../DTOs/taxation.dto";
import { InvoiceDisplaySetting_DTO } from "../../DTOs/invoice-display-setting.dto";
import { DispensaryService } from "../../shared-services/pharmacy-service/dispensary.service";
import { PharmacyService } from "../../shared-services/pharmacy-service/pharmacy.service";
import { CoreService } from "../../shared-services/core-service/core.service";
import { InsHTTPResponse } from "../../common-models";
import { ENUM_INSHTTPResponseText, ENUM_MessageBox_Status } from "../../shared-enums";
import { CommonFunctions } from "../../common.functions";

@Component({
  selector: "pharmacy-credit-note-print",
  templateUrl: "./pharmacy-credit-note-print.component.html"
})

export class PharmacyCreditNotePrintComponent {

  public receipt: PharmacyCreditNotePrint_DTO = new PharmacyCreditNotePrint_DTO();
  @Input("return-invoice-id") public ReturnInvoiceId: number = 0;
  IsItemLevelVATApplicable: boolean = false;
  IsMainVATApplicable: boolean = false;
  IsItemLevelDiscountApplicable: boolean = false;
  IsMainDiscountAvailable: boolean = false;
  showFooter: boolean = false;
  showEnglish: boolean = false;
  englishText: string = '';
  showNepali: boolean = false;
  nepaliText: string = '';
  showGenericName: boolean = false;
  showItemName: boolean = false;
  showGenNameAfterItemName: boolean = false ;
  LeadingSeparator: string = '';
  public selectedPrinter: PrinterSettingsModel = new PrinterSettingsModel();
  public openBrowserPrintWindow: boolean = false;
  public browserPrintContentObj: any = { innerHTML: '' };
  // public GeneralFieldLabel = new GeneralFieldLabels();
  @Output("call-back-print") callBackPrint: EventEmitter<object> = new EventEmitter();
  ShowItemCode: boolean = false;
  showRackNoInPrint: boolean = false;
  PHRMCustomLabels = new CustomLabelsConfig();
  TaxationTypes: TaxationTypeDto[] = [];
  TaxationGroups: TaxationGroupDto[] = [];
  TaxationSubGroups: TaxationSubGroupDto[] = [];
  ApplicableTaxableGroups: TaxationGroupDto[]=[];
  ApplicableTaxableSubGroups: TaxationSubGroupDto[]=[];
  TaxationBreakDownTableHeader: { ColumnName: string; ColumnSpan: number; RowSpan: number; }[] = [];
  ShowTaxBreakdownInPharmacyInvoiceSales: boolean = false;
  InvoiceDisplaySettings: InvoiceDisplaySetting_DTO = new InvoiceDisplaySetting_DTO();
  ShowQRCode: boolean = false;
  IsShowTaxColumnInInvoice: boolean = false;

  constructor(public coreService: CoreService,
    public pharmacyBLService: PharmacyBLService,
    public messageBoxService: MessageboxService,
    public _dispensaryService: DispensaryService,
    public _pharmacyService: PharmacyService,
    private changeDetector: ChangeDetectorRef
  ) {
    // this.GeneralFieldLabel = coreService.GetFieldLabelParameter();
    this.GetRackNoParameterSettings();
    this.GetParameterToShowOrHideTaxBreakdownInPharmacyInvoiceSales();
    this.PHRMCustomLabels = this.coreService.GetModuleLabels('Pharmacy');
    this.TaxationTypes = this._pharmacyService.TaxationTypes;
    this.TaxationGroups = this._pharmacyService.TaxationGroups;
    this.TaxationSubGroups = this._pharmacyService.TaxationSubGroups;
    this.InvoiceDisplaySettings = this.coreService.GetPharmacyInvoiceDisplaySettings();
    this.ShowQRCode = this.coreService.GetPharmacyInvoiceQRConfig('dispensary-credit-note');
    this.ShowTaxColumnInInvoice();

  }

  ngOnInit() {
    this.CheckSalesCustomization();
    this.GetPharmacyInvoiceFooterParameter();
    this.GetPharmacyItemNameDisplaySettings();
    this.GetDisplayGenericItemCodeParameter();

    if (this.ReturnInvoiceId) {
      this.GetCreditNoteInfo(this.ReturnInvoiceId);
    }
  }
  GetParameterToShowOrHideTaxBreakdownInPharmacyInvoiceSales(): void {
    const params = this.coreService.Parameters.find(a => a.ParameterGroupName === "Pharmacy" && a.ParameterName === "EnableTaxBreakdown");
    if (params) {
      this.ShowTaxBreakdownInPharmacyInvoiceSales = params.ParameterValue === "true" ? true : false;
    } else {
      this.ShowTaxBreakdownInPharmacyInvoiceSales = false;
    }
  }


  CheckSalesCustomization() {
    let salesParameterString = this.coreService.Parameters.find(p => p.ParameterName == "SalesFormCustomization" && p.ParameterGroupName == "Pharmacy");
    if (salesParameterString != null) {
      let SalesParameter = JSON.parse(salesParameterString.ParameterValue);
      this.IsItemLevelVATApplicable = (SalesParameter.EnableItemLevelVAT == true);
      this.IsMainVATApplicable = (SalesParameter.EnableMainVAT == true);
      this.IsItemLevelDiscountApplicable = (SalesParameter.EnableItemLevelDiscount == true);
      this.IsMainDiscountAvailable = (SalesParameter.EnableMainDiscount == true);

    }
  }

  GetPharmacyInvoiceFooterParameter() {
    let InvFooterParameterStr = this.coreService.Parameters.find(p => p.ParameterName == "PharmacyInvoiceFooterNoteSettings" && p.ParameterGroupName == "Pharmacy");
    if (InvFooterParameterStr != null) {
      let FooterParameter = JSON.parse(InvFooterParameterStr.ParameterValue);
      if (FooterParameter.ShowFooter == true) {
        this.showFooter = true;
        if (FooterParameter.ShowEnglish == true) {
          this.showEnglish = true;
          this.englishText = FooterParameter.EnglishText;
        }
        if (FooterParameter.ShowNepali == true) {
          this.showNepali = true;
          this.nepaliText = FooterParameter.NepaliText;
        }
      }
    }
  }

  GetPharmacyItemNameDisplaySettings() {
    let checkGeneric = this.coreService.Parameters.find(p => p.ParameterName == "PharmacyItemNameDisplaySettings" && p.ParameterGroupName == "Pharmacy");
    if (checkGeneric != null) {
      let phrmItemNameSettingValue = JSON.parse(checkGeneric.ParameterValue);
      this.showGenericName = phrmItemNameSettingValue.Show_GenericName;
      this.showItemName = phrmItemNameSettingValue.Show_ItemName;
      this.showGenNameAfterItemName = phrmItemNameSettingValue.Show_GenericName_After_ItemName;
      this.LeadingSeparator = phrmItemNameSettingValue.Separator.trim();
    }
  }
  GetDisplayGenericItemCodeParameter() {
    let genericItemCodeParameter = this.coreService.Parameters.find(p => p.ParameterName == "DisplayGenericItemCodeInInvoice" && p.ParameterGroupName == "Pharmacy");
    if (genericItemCodeParameter) {
      this.ShowItemCode = JSON.parse(genericItemCodeParameter.ParameterValue);
    }
  }


  GetCreditNoteInfo(InvoiceIdReturnId:number) {
    if (InvoiceIdReturnId > 0) {
      this.pharmacyBLService.GetSaleReturnInvoiceItemsByInvoiceRetId(InvoiceIdReturnId).subscribe((res: InsHTTPResponse) => {
        if (res.Status === ENUM_INSHTTPResponseText.OK) {
          this.receipt = res.Results;
          this.UpdateItemDisplayName(this.showGenericName, this.showItemName, this.LeadingSeparator, this.showGenNameAfterItemName);
          let taxes:any = this.receipt.InvoiceItems.find(a => a.AppliedTaxes.length > 0)
          this.FormatTaxationBreakDownTaxes(taxes.AppliedTaxes);
        }
        else {
          this.messageBoxService.showMessage(ENUM_MessageBox_Status.Failed, ['Failed to retrieve credit note information']);
        }
      },
        (err:any) => {
          this.messageBoxService.showMessage(ENUM_MessageBox_Status.Failed, ['Failed to credit note information' + err.ErrorMessage]);
        });
    }
  }

  /**
  * Display the ItemName in the receipts based on core cfg parameter "PharmacyItemNameDisplaySettings"
  * @param showGenericName true if generic name should be seen
  * @param showItemName true if item name should be seen
  * @param separator string that separates itemname and genericname, wild card value "brackets" uses '()' to separate item name and generic name
  * @param showGenericNameAfterItemName true if itemname should be seen first and genericname should be seen after
  * @returns void
  * @default Shows only ItemName
  * @description created by Rohit on 4th Oct, 2021
  */
  public UpdateItemDisplayName(showGenericName: boolean, showItemName: boolean, separator: string = '', showGenericNameAfterItemName: boolean) {
    for (var i = 0; i < this.receipt.InvoiceItems.length; i++) {
      var item = this.receipt.InvoiceItems[i];
      if (showGenericName == true && showItemName == false) {
        item.ItemDisplayName = item.GenericName;
      }
      else if (showGenericName == false && showItemName == true) {
        item.ItemDisplayName = item.ItemName;
      }
      else if (showGenericName == true && showItemName == true) {
        if (showGenericNameAfterItemName == true) {
          if (separator == "" || separator.toLowerCase() == "brackets") {
            item.ItemDisplayName = `${item.ItemName}(${item.GenericName})`;
          }
          else {
            item.ItemDisplayName = item.ItemName + separator + item.GenericName;
          }
        }
        else {
          if (separator == "" || separator.toLowerCase() == "brackets") {
            item.ItemDisplayName = `${item.GenericName}(${item.ItemName})`;
          }
          else {
            item.ItemDisplayName = item.GenericName + separator + item.ItemName;
          }
        }
      }
      else {
        item.ItemDisplayName = item.ItemName;
      }
    }
  }

  OnPrinterChanged($event:any) {
    this.selectedPrinter = $event;
  }

  public Print(idToBePrinted: string = 'credit-note') {
    this.browserPrintContentObj.innerHTML = document.getElementById(idToBePrinted)!.innerHTML;
    this.openBrowserPrintWindow = false;
    this.changeDetector.detectChanges();
    this.openBrowserPrintWindow = true;
  }

  CallBackBillPrint($event:any) {
    let printCount = this.receipt.PrintCount + 1;
    let InvoiceReturnId = this.receipt.InvoiceReturnId;
    this.pharmacyBLService.PutPrintCount(printCount, InvoiceReturnId).subscribe();
    this.callBackPrint.emit();
  }
  GetRackNoParameterSettings(): void {
    let RackNoPrintSetting = this.coreService.Parameters.find(p => p.ParameterName == "ShowRackNoInPharmacyReceipt" && p.ParameterGroupName == "Pharmacy");
    if (RackNoPrintSetting) {
      let showRackNoInPrint = JSON.parse(RackNoPrintSetting.ParameterValue);
      this.showRackNoInPrint = showRackNoInPrint.ShowRackNoInNormalPharmacyReceipt;
    }
  }
  FormatTaxationBreakDownTaxes(appliedTaxes: AppliedTax[]) {
    const taxationGroupIds = new Set<number>();

    if (this.receipt && this.receipt.InvoiceItems && this.receipt.InvoiceItems.length) {
      this.receipt.InvoiceItems.forEach(item => {
        if (item.AppliedTaxes && item.AppliedTaxes.length) {
          item.AppliedTaxes.forEach(tax => {
            if (tax.TaxationGroupId) {
              taxationGroupIds.add(tax.TaxationGroupId);
            }
          });
        }
      });
    }
    const mergedSubGroups: TaxationSubGroupDto[] = [];
    taxationGroupIds.forEach(groupId => {
      const subGroups = this.TaxationSubGroups.filter(sub => sub.TaxationGroupId === groupId);
      mergedSubGroups.push(...subGroups);
    });

    const uniqueSubGroupsMap = new Map<number, TaxationSubGroupDto>();
    mergedSubGroups.forEach(sub => {
      if (!uniqueSubGroupsMap.has(sub.TaxationSubGroupId)) {
        uniqueSubGroupsMap.set(sub.TaxationSubGroupId, sub);
      }
    });

    this.ApplicableTaxableSubGroups = Array.from(uniqueSubGroupsMap.values())
      .sort((a, b) => a.DisplaySequence - b.DisplaySequence);

    this.TaxationBreakDownTableHeader = [
      { ColumnName: 'HSN', ColumnSpan: 1, RowSpan: 2 },
      { ColumnName: 'Tax Rate', ColumnSpan: 1, RowSpan: 2 },
      { ColumnName: 'Taxable Amt', ColumnSpan: 1, RowSpan: 2 }
    ];

    this.ApplicableTaxableSubGroups.forEach(item => {
      this.TaxationBreakDownTableHeader.push({
        ColumnName: item.TaxationSubGroupDisplayName,
        ColumnSpan: 2,
        RowSpan: 1
      });
    });

    this.TaxationBreakDownTableHeader.push({
      ColumnName: 'Tax Amt',
      ColumnSpan: 1,
      RowSpan: 2
    });
  }
  FormatHSNCode(appliedTaxes: AppliedTax[]) {
    if (appliedTaxes.length > 0) {
      return appliedTaxes[0].HSCode;
    }
    return '-';
  }

  FormatTaxRate(appliedTaxes: AppliedTax[]) {
    return CommonFunctions.parseAmount(appliedTaxes.reduce((a, b) => a + b.TaxationRate, 0), 4);
  }

  FormatTaxableAmount(appliedTaxes: AppliedTax[]) {
    if (appliedTaxes.length > 0) {
      return appliedTaxes[0].TaxableAmount;
    }
    return '-';
  }

  FormatTaxPercentage(group: TaxationSubGroupDto, appliedTaxes: AppliedTax[]) {
    let availableTax = appliedTaxes.find(a =>
      a.TaxationGroupId === group.TaxationGroupId &&
      a.TaxationSubGroupId === group.TaxationSubGroupId
    );
    if (availableTax) {
      return availableTax.TaxationRate;
    }
    else {
      return '-';
    }
  }

  FormatTaxAmount(group: TaxationSubGroupDto, appliedTaxes: AppliedTax[]) {
    let availableTax = appliedTaxes.find(a =>
      a.TaxationGroupId === group.TaxationGroupId &&
      a.TaxationSubGroupId === group.TaxationSubGroupId
    );
    if (availableTax) {
      return availableTax.TaxAmount;
    }
    else {
      return '-';
    }
  }
  FormatTotalTaxAmount(appliedTaxes: AppliedTax[]) {
    return CommonFunctions.parseAmount(appliedTaxes.reduce((a, b) => a + b.TaxAmount, 0), 4);
  }

  ShowTaxColumnInInvoice() {
    let showTaxColumnInInvoice = this.coreService.Parameters.find(p => p.ParameterName == "ShowTaxColumnInDispensaryInvoice" && p.ParameterGroupName == "Pharmacy");
    if (showTaxColumnInInvoice != null) {
      this.IsShowTaxColumnInInvoice = JSON.parse(showTaxColumnInInvoice.ParameterValue);
    }
  }
}
