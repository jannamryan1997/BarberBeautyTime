import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EmployeeProfileRoutingModule } from './employee-profile-routing.module';
import { EmployeeProfileViewComponent } from './employee-profile.view';

import { SharedModule } from 'src/app/core/shared/shared.module';

import { EmployeeProfileService } from './employee-profile.service';

import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
    declarations: [EmployeeProfileViewComponent],
    imports: [
        EmployeeProfileRoutingModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        NzGridModule,
        NzButtonModule,
        NzBadgeModule,
        SharedModule,
        NzIconModule,
    ],
    providers: [EmployeeProfileService],
    entryComponents: []
})

export class EmployeeProfileModule {

}
