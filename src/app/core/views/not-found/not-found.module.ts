import { NgModule } from '@angular/core';
import { NotFoundViewComponent } from '../not-found/not-found.view';
import { NotFoundRoutingModule } from './not-found-routing.module';

import { NzResultModule } from 'ng-zorro-antd/result';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
    declarations: [NotFoundViewComponent],
    imports: [NotFoundRoutingModule,NzResultModule,NzButtonModule],
    providers: [],
    entryComponents: []
})

export class NotFoundModule { }