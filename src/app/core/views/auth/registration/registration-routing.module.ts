import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationViewComponent } from './registration.view';

const registrationRouter: Routes = [{ path: '', component: RegistrationViewComponent }];

@NgModule({
    imports: [RouterModule.forChild(registrationRouter)],
    exports: [RouterModule]
})

export class RegistrationRoutingModule {
}
