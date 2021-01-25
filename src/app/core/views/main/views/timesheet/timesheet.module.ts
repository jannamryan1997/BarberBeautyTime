import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { CreateTimesheetModalComponent } from './modals';
import { TimesheetRoutingModule } from './timesheet-routing.module';
import { TimesheetService } from './timesheet.service';
import { TimesheetViewComponent } from './timesheet.view';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [TimesheetViewComponent,CreateTimesheetModalComponent],
    imports: [TimesheetRoutingModule,SharedModule,CommonModule,ReactiveFormsModule,FormsModule,NzCalendarModule],
    providers: [TimesheetService,    DatePipe],
    entryComponents: [CreateTimesheetModalComponent],
})

export class TimesheetModule { }