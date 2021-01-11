import { NgModule } from '@angular/core';
import { MainViewComponent } from './main.view';
import { MainRoutingModule } from './main-routing.module';
import { SideBarComponent, TopBarComponent } from './component';
import { CommonModule } from '@angular/common';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [MainViewComponent, TopBarComponent, SideBarComponent],
    imports: [MainRoutingModule, SharedModule, CommonModule, ReactiveFormsModule, FormsModule],
    providers: [],
    entryComponents: []
})

export class MainModule { }
