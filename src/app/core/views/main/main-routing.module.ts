import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainViewComponent } from './main.view';

const mainRoutes: Routes = [{
    path: '', component: MainViewComponent, children: [
        { path: '', pathMatch: 'full', redirectTo: 'home' },
        {
            path: 'home',
            loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule)
        },
        {
            path: 'account',
            loadChildren: () => import('./views/account/account.module').then(m => m.AccountModule)
        },
        {
            path:'providers',
            loadChildren:() =>import('./views/providers/providers.module').then(m=>m.ProvidersModule)
        },
        {
            path: 'changed-password',
            loadChildren: () => import('./views/password-change/password-change.module').then(m => m.PasswordChangeModule)
        }

    ]
}];

@NgModule({
    imports: [RouterModule.forChild(mainRoutes)],
    exports: [RouterModule]
})

export class MainRoutingModule { }
