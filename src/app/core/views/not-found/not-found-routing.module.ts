import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundViewComponent } from './not-found.view';

const notFoundRoutes: Routes = [{ path: '', component: NotFoundViewComponent }];

@NgModule({
    imports: [RouterModule.forChild(notFoundRoutes)],
    exports: [RouterModule]
})

export class NotFoundRoutingModule { }