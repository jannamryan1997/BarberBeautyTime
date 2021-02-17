import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from '../../guards/role.guard';
import { EUserRole } from '../../models/auth-user';

import { MainViewComponent } from './main.view';

const mainRoutes: Routes = [{
    path: '', component: MainViewComponent, children: [
        {
            path: 'providers',
            loadChildren: () => import('./views/providers/providers.module').then(m => m.ProvidersModule),
            data: {
                enabledRoles: [EUserRole.Owner]
            },
            canActivate: [RoleGuard]
        },
        {
            path: 'changed-password',
            loadChildren: () => import('./views/password-change/password-change.module').then(m => m.PasswordChangeModule),
            data: {
                enabledRoles: [EUserRole.Owner, EUserRole.Employee]
            },
            canActivate: [RoleGuard]
        },
        {
            path: 'timesheet/:providerId/:employId',
            loadChildren: () => import('./views/timesheet/timesheet.module').then(m => m.TimesheetModule),
            data: {
                enabledRoles: [EUserRole.Owner, EUserRole.Employee]
            },
            canActivate: [RoleGuard]
        },
        {
            path: 'employees/:id',
            loadChildren: () => import('./views/employee/employee.module').then(m => m.EmployeeModule),
            data: {
                enabledRoles: [EUserRole.Owner]
            },
            canActivate: [RoleGuard]
        },
        {
            path: 'profile',
            loadChildren: () => import('./views/employee-profile/employee-profile.module').then(m => m.EmployeeProfileModule),
            data: {
                enabledRoles: [EUserRole.Employee]
            },
            canActivate: [RoleGuard]
        },
        {
            path: 'services',
            loadChildren: () => import('./views/services/services.module').then(m => m.ServicesModule),
            data: {
                enabledRoles: [EUserRole.Employee]
            },
            canActivate: [RoleGuard]
        }

    ]
}];

@NgModule({
    imports: [RouterModule.forChild(mainRoutes)],
    exports: [RouterModule]
})

export class MainRoutingModule { }
