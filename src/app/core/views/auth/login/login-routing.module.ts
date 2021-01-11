import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginViewComponent } from './login.view';

const loginRouter: Routes = [{ path: '', component: LoginViewComponent }];

@NgModule({
    imports: [RouterModule.forChild(loginRouter)],
    exports: [RouterModule]
})

export class LoginRoutingModule {
}
