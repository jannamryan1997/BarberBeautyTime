import { CommonModule } from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import { SharedModule } from 'src/app/core/shared/shared.module';

import { PasswordChangeRoutingModule } from './password-change-routing.module';

import { PasswordChangeService } from './password-change.service';
import { PasswordChangeViewComponent } from './password-change.view';

@NgModule({
    declarations:[PasswordChangeViewComponent],
    imports:[
        PasswordChangeRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
        CommonModule],
    providers:[PasswordChangeService],
    entryComponents:[]
})

export class PasswordChangeModule{}