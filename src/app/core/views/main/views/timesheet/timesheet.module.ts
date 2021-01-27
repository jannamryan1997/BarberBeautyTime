import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { ActionModal, CreateServiceModalComponent, CreateTimesheetModalComponent } from './modals';
import { TimesheetRoutingModule } from './timesheet-routing.module';
import { TimesheetService } from './timesheet.service';
import { TimesheetViewComponent } from './timesheet.view';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';


@NgModule({
    declarations: [
        TimesheetViewComponent,
        CreateTimesheetModalComponent,
        ActionModal,
        CreateServiceModalComponent],
    imports: [
        TimesheetRoutingModule,
        SharedModule,CommonModule,
        ReactiveFormsModule,
        FormsModule,
        NzCalendarModule,
        NzCardModule,
        NzGridModule,
        NzBadgeModule,
        NzSelectModule,
        NzAutocompleteModule
    ],
    providers: [TimesheetService,DatePipe],
    entryComponents: [
        CreateTimesheetModalComponent,
        ActionModal,
        CreateServiceModalComponent],
})

export class TimesheetModule { }