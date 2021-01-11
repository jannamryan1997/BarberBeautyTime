import { NgModule } from '@angular/core';
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import { SharedModule } from 'src/app/core/shared/shared.module';

import { ForgotPasswordViewComponent } from './forgot-password.view';

import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { ForgotPasswordService } from './forgot-password.service';

@NgModule({
    declarations:[ForgotPasswordViewComponent],
    imports:[
        ForgotPasswordRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
        CommonModule],
    providers:[ForgotPasswordService],
    entryComponents:[]
})

export class ForgotPasswordModule{}