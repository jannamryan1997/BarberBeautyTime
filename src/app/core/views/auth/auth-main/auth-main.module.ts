import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { AuthMainRoutingModule } from './auth-main-routing.module';
import { AuthMainViewComponent } from './auth-main.view';

@NgModule({
    declarations: [AuthMainViewComponent],
    imports: [AuthMainRoutingModule,SharedModule],
    providers: [],
    entryComponents: []
})

export class AuthMainModule { }
