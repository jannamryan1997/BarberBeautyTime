import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthViewComponent } from './auth.view';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [AuthViewComponent],
    imports: [AuthRoutingModule,SharedModule],
    providers: [],
    entryComponents: []
})

export class AuthModule { }
