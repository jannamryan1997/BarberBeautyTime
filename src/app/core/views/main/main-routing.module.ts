import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainViewComponent } from './main.view';

const mainRoutes: Routes = [{
    path: '', component: MainViewComponent, children: [
        {
            path: 'account',
            loadChildren: () => import('./views/account/account.module').then(m => m.AccountModule)
        },
        {
            path:'home',
            loadChildren:() =>import('./views/home/home.module').then(m=>m.HomeModule)
        }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(mainRoutes)],
    exports: [RouterModule]
})

export class MainRoutingModule { }
