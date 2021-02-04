import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeViewComponent } from './employee.view';

const employeeRoutes: Routes = [{ path: '', component: EmployeeViewComponent }];
@NgModule({
    imports: [RouterModule.forChild(employeeRoutes)],
    exports: [RouterModule]
})

export class EmployeeRoutingModule { }
