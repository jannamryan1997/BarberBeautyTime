import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountViewComponent } from './account.view';

const accountRouter: Routes = [{ path: '', component: AccountViewComponent }]

@NgModule({
    imports: [RouterModule.forChild(accountRouter)],
    exports: [RouterModule]
})

export class AccountRoutingModule { }