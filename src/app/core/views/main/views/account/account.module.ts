import { NgModule } from '@angular/core';
import { AccountRoutingModule } from './account-routing.module';
import { AccountViewComponent } from './account.view';

@NgModule({
    declarations: [AccountViewComponent],
    imports: [AccountRoutingModule],
    providers: [],
    entryComponents: []
})

export class AccountModule { }