import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { PasswordChangeViewComponent } from './password-change.view';

const passwordChangeRoutes: Routes = [{path: '', component: PasswordChangeViewComponent}];

@NgModule({
    imports: [RouterModule.forChild(passwordChangeRoutes)],
    exports: [RouterModule]
})

export class PasswordChangeRoutingModule {}
