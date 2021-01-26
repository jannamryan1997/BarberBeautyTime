import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/core/shared/shared.module";
import { HomeRoutingModule } from './home-routing.module';
import { HomeViewComponent } from './home.view';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";



///ng-zorro
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';


@NgModule({
    declarations: [HomeViewComponent],
    imports: [
        HomeRoutingModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        NzCardModule,
        NzGridModule,
        NzCalendarModule
    ],
    providers: [],
    entryComponents: []
})

export class HomeModule { }