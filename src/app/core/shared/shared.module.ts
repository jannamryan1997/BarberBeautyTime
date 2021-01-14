import { NgModule } from '@angular/core';
import { MenuService } from '../services/menu.service';

//NG-ZORRO
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

@NgModule({
    declarations: [],
    imports: [
        NzFormModule,
        NzButtonModule,
        NzIconModule,
        NzInputModule,
        NzLayoutModule,
        NzGridModule,
        NzCheckboxModule,
        NzBreadCrumbModule,
        NzMenuModule,
        NzModalModule,
        NzMessageModule,
        NzDropDownModule,
        NzPaginationModule

    ],
    entryComponents: [],
    providers: [MenuService],
    exports: [
        NzFormModule,
        NzButtonModule,
        NzIconModule,
        NzInputModule,
        NzLayoutModule,
        NzGridModule,
        NzCheckboxModule,
        NzBreadCrumbModule,
        NzMenuModule,
        NzModalModule,
        NzMessageModule,
        NzDropDownModule,
        NzPaginationModule
    ]
})

export class SharedModule { }
