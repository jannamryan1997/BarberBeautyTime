import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { TimesheetViewComponent } from './timesheet.view';

const timesheetRoutes: Routes = [{path: '', component: TimesheetViewComponent}]

@NgModule({
    imports: [RouterModule.forChild(timesheetRoutes)],
    exports: [RouterModule]
})

export class TimesheetRoutingModule {}
