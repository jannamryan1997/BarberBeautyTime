import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeProfileViewComponent } from './employee-profile.view';

const employeeProfileRoutes: Routes = [{ path: '', component: EmployeeProfileViewComponent }];

@NgModule({
    imports: [RouterModule.forChild(employeeProfileRoutes)],
    exports: [RouterModule]
})

export class EmployeeProfileRoutingModule{

}
