import { importType } from '@angular/compiler/src/output/output_ast';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from '../../guards/role.guard';
import { EUserRole } from '../../models/auth-user';

import { MainViewComponent } from './main.view';

const mainRoutes: Routes = [{
    path: '', component: MainViewComponent, children: [
        { path: '', pathMatch: 'full', redirectTo: 'home' },
        {
            path: 'home',
            loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule),
            data: {
                enabledRoles: [EUserRole.Admin,
                EUserRole.Employee, EUserRole.Client]
            },
        },
        {
            path: 'account',
            loadChildren: () => import('./views/account/account.module').then(m => m.AccountModule),
            data: {
                enabledRoles: [EUserRole.Admin, EUserRole.Owner, EUserRole.Employee, EUserRole.Client]
            },
        },
        {
            path: 'providers',
            loadChildren: () => import('./views/providers/providers.module').then(m => m.ProvidersModule),
            data: {
                enabledRoles: [EUserRole.Admin, EUserRole.Owner, EUserRole.Employee, EUserRole.Client]
            },
        },
        {
            path: 'changed-password',
            loadChildren: () => import('./views/password-change/password-change.module').then(m => m.PasswordChangeModule),
            data: {
                enabledRoles: [EUserRole.Admin, EUserRole.Owner, EUserRole.Employee, EUserRole.Client]
            },
        },
        {
            path:'timesheet/:providerId/:employId',
            loadChildren:()=>import('./views/timesheet/timesheet.module').then(m=>m.TimesheetModule),
            data:{
                enabledRoles: [EUserRole.Admin, EUserRole.Owner, EUserRole.Employee, EUserRole.Client]   
            }
        }

    ]
}];

@NgModule({
    imports: [RouterModule.forChild(mainRoutes)],
    exports: [RouterModule]
})

export class MainRoutingModule { }
