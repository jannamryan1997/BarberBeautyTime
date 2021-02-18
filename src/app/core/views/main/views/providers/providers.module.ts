import {NgModule} from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import { SharedModule } from 'src/app/core/shared/shared.module';

import { ProvidersViewComponent } from './providers.view';
import { ProvidersRoutingModule } from './providers-routing.module';
import { ProvidersService } from './providers.service';

import { CreateProviderModalComponent } from './modals';

import {DropdownModule} from 'primeng/dropdown';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';

import { PaginatorComponent } from 'src/app/core/components/paginator';


@NgModule({
    declarations: [
        ProvidersViewComponent,
        CreateProviderModalComponent,
        PaginatorComponent
],
    imports: [
        ProvidersRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        DropdownModule,
        NzTableModule,
        NzTimePickerModule,
        NzStatisticModule
    ],
    providers: [ProvidersService],
    entryComponents: [
        CreateProviderModalComponent,
       ]
})

export class ProvidersModule{}
