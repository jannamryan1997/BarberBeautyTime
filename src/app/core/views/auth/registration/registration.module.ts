import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationService } from './registration.service';
import { RegistrationViewComponent } from './registration.view';


@NgModule({
    declarations: [RegistrationViewComponent],
    imports: [
        RegistrationRoutingModule,
        SharedModule, 
        CommonModule, 
        ReactiveFormsModule, 
        FormsModule],
    providers: [RegistrationService],
    entryComponents: []
})

export class RegistrationModule { }
