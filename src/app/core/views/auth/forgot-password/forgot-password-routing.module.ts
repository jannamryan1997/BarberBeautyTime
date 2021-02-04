import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordViewComponent } from './forgot-password.view';

const forgotPasswordRoutes: Routes = [{ path: '', component: ForgotPasswordViewComponent }];

@NgModule({
    imports: [RouterModule.forChild(forgotPasswordRoutes)],
    exports: [RouterModule]
})

export class ForgotPasswordRoutingModule { }
