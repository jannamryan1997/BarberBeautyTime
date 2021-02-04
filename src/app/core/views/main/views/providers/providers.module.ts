import {NgModule} from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import { SharedModule } from 'src/app/core/shared/shared.module';

import { ProvidersViewComponent } from './providers.view';
import { ProvidersRoutingModule } from './providers-routing.module';
import { ProvidersService } from './providers.service';

import { AddEmployeModalComponent, CreateEmployemodalComponent, CreateProviderModalComponent } from './modals';

import {DropdownModule} from 'primeng/dropdown';

import { NzTableModule } from 'ng-zorro-antd/table';

@NgModule({
    declarations: [
        ProvidersViewComponent,
        CreateProviderModalComponent,
        CreateEmployemodalComponent,
        AddEmployeModalComponent],
    imports: [
        ProvidersRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        DropdownModule,
        NzTableModule
    ],
    providers: [ProvidersService],
    entryComponents: [
        CreateProviderModalComponent,
        CreateEmployemodalComponent,
        AddEmployeModalComponent]
})

export class ProvidersModule{}
