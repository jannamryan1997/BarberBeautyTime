import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProvidersViewComponent } from './providers.view';

const providersRoutes: Routes = [{ path: '', component: ProvidersViewComponent }]

@NgModule({
    imports: [RouterModule.forChild(providersRoutes)],
    exports: [RouterModule]
})

export class ProvidersRoutingModule { }