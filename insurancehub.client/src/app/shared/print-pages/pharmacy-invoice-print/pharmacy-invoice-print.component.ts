import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from "@angular/core";

import { PharmacyInvoicePrint_DTO } from "./pharmacy-invoice-print.dto";
import { PrinterSettingsModel } from "../../../setting/printers/select-printer/printer-settings.model";
import { SelectedPatientDto } from "../../DTOs/selected-patient.dto";
import { AppliedTax, TaxationGroupDto, TaxationSubGroupDto, TaxationTypeDto } from "../../DTOs/taxation.dto";
import { InvoiceDisplaySetting_DTO } from "../../DTOs/invoice-display-setting.dto";
import { PharmacyBLService } from "../../shared-services/pharmacy-service/pharmacy.bl.service";
import { CoreService } from "../../shared-services/core-service/core.service";
import { MessageboxService } from "../../messagebox/messagebox.service";
import { DispensaryService } from "../../shared-services/pharmacy-service/dispensary.service";
import { PharmacyService } from "../../shared-services/pharmacy-service/pharmacy.service";
import { CustomLabelsConfig } from "../../models/custom-labels-config.dto";
import { HibLiveClaimInvoiceDetails } from "../../DTOs/hib-live-claim-invoice-details.dto";
import { InsHTTPResponse } from "../../common-models";
import { ENUM_CreditModule, ENUM_INSHTTPResponseText, ENUM_MessageBox_Status, ENUM_Scheme_ApiIntegrationNames } from "../../shared-enums";
import { CommonFunctions } from "../../common.functions";
import { PHRMTaxBreakdownModel } from "../../models/pharmacy-tax-breakdown.model";

@Component({
  selector: "pharmacy-invoice-print",
  templateUrl: "./pharmacy-invoice-print.component.html",
  standalone:false
})

export class PharmacyInvoicePrintComponent {

  public receipt: PharmacyInvoicePrint_DTO = new PharmacyInvoicePrint_DTO();
  @Input("invoice-id") public InvoiceId: number = 0;
  @Input("allow-hib-claim")
  AllowHIBLiveClaim: boolean = false;
  IsItemLevelVATApplicable: boolean = false;
  IsMainVATApplicable: boolean = false;
  IsItemLevelDiscountApplicable: boolean = false;
  IsMainDiscountAvailable: boolean = false;
  showFooter: boolean=false;
  showEnglish: boolean=false;
  englishText: string = '';
  showNepali: boolean = false;
  nepaliText: string = '';
  showGenericName: boolean = false;
  showItemName: boolean = false;
  showGenNameAfterItemName: boolean=false;
  LeadingSeparator: string = '';
  public selectedPrinter: PrinterSettingsModel = new PrinterSettingsModel();
  public openBrowserPrintWindow: boolean = false;
  public browserPrintContentObj: any = { innerHTML: '' };
  @Output("call-back-print") callBackPrint: EventEmitter<object> = new EventEmitter();
  InvoiceLabel: string = 'INVOICE';
  ShowItemCode: boolean = false;
  // public GeneralFieldLabel = new GeneralFieldLabels();
  showRackNoInPrint: boolean = false;
  SelectedLiveClaimPatient = new SelectedPatientDto();
  HibLiveClaimInvoiceDetail = new HibLiveClaimInvoiceDetails();
  ShowHibLiveClaimUI: boolean = false;
  ShowTaxBreakdownInPharmacyInvoice: boolean = false;

  HibLiveClaimConfig = { "IsEnabled": false, "EnableManualLiveClaim": false, "EnableAutoLiveClaim": false, "EnableLiveDocumentSubmission": false };
  TaxBreakdownData: Array<PHRMTaxBreakdownModel> = new Array<PHRMTaxBreakdownModel>();

  PHRMCustomLabels = new CustomLabelsConfig();

  TaxationTypes: TaxationTypeDto[] = [];
  TaxationGroups: TaxationGroupDto[] = [];
  TaxationSubGroups: TaxationSubGroupDto[] = [];
  ApplicableTaxableGroups: TaxationGroupDto[]=[];
  ApplicableTaxableSubGroups: TaxationSubGroupDto[]=[];
  TaxationBreakDownTableHeader: { ColumnName: string; ColumnSpan: number; RowSpan: number; }[] = [];
  InvoiceDisplaySettings: InvoiceDisplaySetting_DTO = new InvoiceDisplaySetting_DTO();
  ShowQRCode: boolean = false;
  IsShowTaxColumnInInvoice: boolean = false;

  constructor(public coreService: CoreService,
    public pharmacyBLService: PharmacyBLService,
    public messageBoxService: MessageboxService,
    public _dispensaryService: DispensaryService,
    public _pharmacyService: PharmacyService,
    private changeDetector: ChangeDetectorRef) {
    // this.GeneralFieldLabel = coreService.GetFieldLabelParameter();
    this.GetRackNoParameterSettings();
    this.PHRMCustomLabels = this.coreService.GetModuleLabels('Pharmacy');

    this.GetParameterToShowOrHideTaxBreakdownInPharmacyInvoice();
    this.ShowTaxColumnInInvoice();
    this.TaxationTypes = this._pharmacyService.TaxationTypes;
    this.TaxationGroups = this._pharmacyService.TaxationGroups;
    this.TaxationSubGroups = this._pharmacyService.TaxationSubGroups;
    this.InvoiceDisplaySettings = this.coreService.GetPharmacyInvoiceDisplaySettings();
    this.ShowQRCode = this.coreService.GetPharmacyInvoiceQRConfig('sales-invoice');
  }
  ngOnInit() {
    this.CheckSalesCustomization();
    this.GetPharmacyInvoiceFooterParameter();
    this.GetPharmacyItemNameDisplaySettings();
    this.GetPharmacyInvoiceDisplayLabelParameter();
    this.GetDisplayGenericItemCodeParameter();
    this.GetHibLiveClaimParameter();

    if (this.InvoiceId) {
      this.GetInvoiceInfo(this.InvoiceId);
    }
  }


  GetHibLiveClaimParameter() {
    const param = this.coreService.Parameters.find(p => p.ParameterGroupName === "GovInsurance" && p.ParameterName === "HIBLiveClaimConfig");
    if (param) {
      this.HibLiveClaimConfig = JSON.parse(param.ParameterValue);
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

  GetDisplayGenericItemCodeParameter() {
    let genericItemCodeParameter = this.coreService.Parameters.find(p => p.ParameterName == "DisplayGenericItemCodeInInvoice" && p.ParameterGroupName == "Pharmacy");
    if (genericItemCodeParameter) {
      this.ShowItemCode = JSON.parse(genericItemCodeParameter.ParameterValue);
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


  GetInvoiceInfo(InvoiceId:number) {
    this.pharmacyBLService.GetInvoiceReceiptByInvoiceId(InvoiceId).subscribe((res: InsHTTPResponse) => {
      if (res.Status === ENUM_INSHTTPResponseText.OK) {
        this.receipt = res.Results;
        if (this.receipt) {
          if (this.receipt.SchemeApiIntegration === ENUM_Scheme_ApiIntegrationNames.NGHIS && this.HibLiveClaimConfig && this.HibLiveClaimConfig.IsEnabled && this.HibLiveClaimConfig.EnableManualLiveClaim) {
            this.SelectedLiveClaimPatient.PatientId = this.receipt.PatientInfo.PatientId;
            this.SelectedLiveClaimPatient.PatientCode = this.receipt.PatientInfo.PatientCode;
            this.SelectedLiveClaimPatient.PatientName = this.receipt.PatientInfo.ShortName;
            this.SelectedLiveClaimPatient.PatientVisitId = this.receipt.PatientVisitId;
            this.SelectedLiveClaimPatient.PerformerId = this.receipt.PrescriberId;

            this.HibLiveClaimInvoiceDetail.InvoiceId = this.receipt.InvoiceId;
            this.HibLiveClaimInvoiceDetail.ModuleName = ENUM_CreditModule.Pharmacy;
            this.HibLiveClaimInvoiceDetail.ApiIntegrationName = this.receipt.SchemeApiIntegration;
            this.HibLiveClaimInvoiceDetail.InvoiceFrom = ENUM_CreditModule.Pharmacy;
            this.ShowHibLiveClaimUI = this.AllowHIBLiveClaim;
          }
        }
        this.UpdateItemDisplayName(this.showGenericName, this.showItemName, this.LeadingSeparator, this.showGenNameAfterItemName);
        let taxes = this.receipt.InvoiceItems.find(a => a.AppliedTaxes.length > 0);
        if (taxes) {
          this.FormatTaxationBreakDownTaxes(taxes.AppliedTaxes);
        }
      }
      else {
        this.messageBoxService.showMessage(ENUM_MessageBox_Status.Failed, ['Failed to retrieve invoice information']);
      }
    },
      (err:any) => {
        this.messageBoxService.showMessage(ENUM_MessageBox_Status.Failed, ['Failed to retrieve invoice information' + err.ErrorMessage]);
      });
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

  public print(idToBePrinted: string = 'printpage') {
    this.browserPrintContentObj.innerHTML = document.getElementById(idToBePrinted)!.innerHTML;
    this.openBrowserPrintWindow = false;
    this.changeDetector.detectChanges();
    this.openBrowserPrintWindow = true;
  }

  callBackBillPrint($event:any) {
    let printCount = this.receipt.PrintCount + 1;
    let invoiceId = this.receipt.InvoiceId;
    this.pharmacyBLService.PutPrintCount(printCount, invoiceId).subscribe((res: InsHTTPResponse) => {
      if (res.Status === ENUM_INSHTTPResponseText.OK) {
        this.receipt.PrintCount = printCount;
      }
    });
    this.callBackPrint.emit();
  }

  GetPharmacyInvoiceDisplayLabelParameter() {
    let pharmacyInvoiceDisplayLabelParams = this.coreService.Parameters.find(p => p.ParameterName == "PharmacyInvoiceDisplayLabel" && p.ParameterGroupName == "Pharmacy");
    if (pharmacyInvoiceDisplayLabelParams != null) {
      this.InvoiceLabel = pharmacyInvoiceDisplayLabelParams.ParameterValue;
    }
  }
  GetRackNoParameterSettings(): void {
    let RackNoPrintSetting = this.coreService.Parameters.find(p => p.ParameterName == "ShowRackNoInPharmacyReceipt" && p.ParameterGroupName == "Pharmacy");
    if (RackNoPrintSetting) {
      let showRackNoInPrint = JSON.parse(RackNoPrintSetting.ParameterValue);
      this.showRackNoInPrint = showRackNoInPrint.ShowRackNoInNormalPharmacyReceipt;
    }
  }

  GetParameterToShowOrHideTaxBreakdownInPharmacyInvoice(): void {
    const params = this.coreService.Parameters.find(a => a.ParameterGroupName === "Pharmacy" && a.ParameterName === "EnableTaxBreakdown");
    if (params) {
      this.ShowTaxBreakdownInPharmacyInvoice = params.ParameterValue === "true" ? true : false;
    } else {
      this.ShowTaxBreakdownInPharmacyInvoice = false;
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
      { ColumnName: this.PHRMCustomLabels.HS_Code, ColumnSpan: 1, RowSpan: 2 },
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

  GetTotalTaxBreakdownAmount(): number {
    let totalTax = 0;

    if (this.receipt && this.receipt.InvoiceItems && this.receipt.InvoiceItems.length) {

      for (let i = 0; i < this.receipt.InvoiceItems.length; i++) {
        let item = this.receipt.InvoiceItems[i];

        if (item.AppliedTaxes && item.AppliedTaxes.length > 0) {
          for (let j = 0; j < item.AppliedTaxes.length; j++) {
            totalTax += item.AppliedTaxes[j].TaxAmount;
          }
        }
      }
    }

    return totalTax;
  }
  ShowTaxColumnInInvoice() {
    let showTaxColumnInInvoice = this.coreService.Parameters.find(p => p.ParameterName == "ShowTaxColumnInDispensaryInvoice" && p.ParameterGroupName == "Pharmacy");
    if (showTaxColumnInInvoice != null) {
      this.IsShowTaxColumnInInvoice = JSON.parse(showTaxColumnInInvoice.ParameterValue);
    }
  }
}
