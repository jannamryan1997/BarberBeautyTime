import {NgModule} from '@angular/core';
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import { SharedModule } from 'src/app/core/shared/shared.module';

import { ProvidersViewComponent } from './providers.view';
import { ProvidersRoutingModule } from './providers-routing.module';
import { ProvidersService } from './providers.service';

@NgModule({
    declarations:[ProvidersViewComponent],
    imports:[
        ProvidersRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
        CommonModule],
    providers:[ProvidersService],
    entryComponents:[]
})

export class ProvidersModule{}