import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { ServicesRoutingModule } from './services-routing.module';
import { ServicesService } from './services.service';
import { ServicesViewComponent } from './services.view';

import { CreateServiceModalComponent } from './modals';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';


@NgModule({
    declarations: [ServicesViewComponent, CreateServiceModalComponent],
    imports: [
        ServicesRoutingModule,
        SharedModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NzCardModule,
        NzDividerModule],
    providers: [ServicesService],
    entryComponents: [CreateServiceModalComponent]
})

export class ServicesModule { }
