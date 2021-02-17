import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicesViewComponent } from './services.view';

const servicesRoutes: Routes = [{ path: '', component: ServicesViewComponent }];

@NgModule({
    imports: [RouterModule.forChild(servicesRoutes)],
    exports: [RouterModule]
})

export class ServicesRoutingModule { }
