import {NgModule} from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import { EmployeeViewComponent } from './employee.view';

import { SharedModule } from 'src/app/core/shared/shared.module';
import { EmployeeRoutingModule } from './employee-routing.module';

import { EmployeeService } from './employee.service';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';

import { AddEmployeModalComponent } from './modals';
import { EmployeeItemComponent } from './components';


@NgModule({
    declarations: [EmployeeViewComponent, AddEmployeModalComponent, EmployeeItemComponent],
    imports: [
        EmployeeRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        NzCardModule,
        NzDividerModule
    ],
    providers: [EmployeeService],
    entryComponents: [AddEmployeModalComponent]
})

export class EmployeeModule{

}
