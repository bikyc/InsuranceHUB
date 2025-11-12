import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FromToDateSelectComponent } from './from-to-date/from-to-date-select.component';
import { DatePickerComponent } from './danphe-datepicker/danphe-datepicker.component';
import { EnglishCalendarComponent } from './calendar/en-calendar/en-calendar.component';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { PaginatePipe } from './pipes/paginate.pipe';
import { NepaliCalendarModule } from './calendar/np/nepali-calendar.module';

@NgModule({
  declarations: [
    FromToDateSelectComponent,
    DatePickerComponent,
    EnglishCalendarComponent,
    SearchFilterPipe,
    PaginatePipe,
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
  ]
})
export class SharedModule {}
