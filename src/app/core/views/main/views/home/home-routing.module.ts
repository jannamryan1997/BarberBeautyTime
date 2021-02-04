import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeViewComponent } from './home.view';

const homeRouter: Routes = [{ path: '', component: HomeViewComponent }];

@NgModule({
    imports: [RouterModule.forChild(homeRouter)],
    exports: [RouterModule]
})

export class HomeRoutingModule{}
