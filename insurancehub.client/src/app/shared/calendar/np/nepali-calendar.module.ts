import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NepaliCalendarService } from './nepali-calendar.service';
import { NepaliCalendarComponent } from './nepali-calendar.component';
import { NepaliCalendarBoardComponent } from '../np-calendar-board/NepaliCalendarBoard';

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [
      NepaliCalendarComponent, 
      NepaliCalendarBoardComponent
    ],
    exports: [
      NepaliCalendarComponent, 
      NepaliCalendarBoardComponent
    ]
})
export class NepaliCalendarModule {

}
