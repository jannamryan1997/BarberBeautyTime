import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthMainViewComponent } from './auth-main.view';


const authMainRouter: Routes = [
    {
        path: '', component: AuthMainViewComponent
    }
]
;

@NgModule({
    imports: [RouterModule.forChild(authMainRouter)],
    exports: [RouterModule]
})

export class AuthMainRoutingModule { }
