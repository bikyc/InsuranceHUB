import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FromToDateSelectComponent } from './from-to-date/from-to-date-select.component';
import { DatePickerComponent } from './danphe-datepicker/danphe-datepicker.component';
import { EnglishCalendarComponent } from './calendar/en-calendar/en-calendar.component';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { PaginatePipe } from './pipes/paginate.pipe';
import { NepaliCalendarModule } from './calendar/np/nepali-calendar.module';
import { Bil_Print_InvoiceMain_Component } from './print-pages/invoice-main/bil-print-invoice-main.component';
import { Bill_Print_CreditNote_Component } from './print-pages/credit-note/bill-print-credit-note.component';
import { PharmacyCreditNotePrintComponent } from './print-pages/pharmacy-credit-note-print/pharmacy-credit-note-print.component';

@NgModule({
  declarations: [
    FromToDateSelectComponent,
    DatePickerComponent,
    EnglishCalendarComponent,
    SearchFilterPipe,
    PaginatePipe,
    Bil_Print_InvoiceMain_Component,
    Bill_Print_CreditNote_Component,
    PharmacyCreditNotePrintComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NepaliCalendarModule,
  ],
  exports: [
    FromToDateSelectComponent,
    DatePickerComponent,
    EnglishCalendarComponent,
    SearchFilterPipe,
    PaginatePipe,
    CommonModule,
    FormsModule,
    Bil_Print_InvoiceMain_Component,
    Bill_Print_CreditNote_Component,
    PharmacyCreditNotePrintComponent
  ]
})
export class SharedModule {}
