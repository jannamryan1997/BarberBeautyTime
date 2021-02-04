import { CommonModule } from '@angular/common';
import {NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { UserViewComponent } from './user.view';
import { NzTableModule } from 'ng-zorro-antd/table';
@NgModule({
    declarations: [UserViewComponent],
    imports: [
        UserRoutingModule,
        SharedModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        NzTableModule
    ],
    providers: [],
    entryComponents: []
})

export class UserModule{}
