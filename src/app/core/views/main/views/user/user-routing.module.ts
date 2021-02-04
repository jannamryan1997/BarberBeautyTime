import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { UserViewComponent } from './user.view';

const userRoutes: Routes = [{path: '', component: UserViewComponent}];

@NgModule({
    imports: [RouterModule.forChild(userRoutes)],
    exports: [RouterModule]
})

export class UserRoutingModule{}
