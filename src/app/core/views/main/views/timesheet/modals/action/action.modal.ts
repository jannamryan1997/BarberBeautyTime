import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Subject } from 'rxjs';
import { ITimesheet } from 'src/app/core/models/timesheet';

@Component({
    selector: 'app-action',
    templateUrl: 'action.modal.html',
    styleUrls: ['action.modal.scss']
})

export class ActionModal implements OnInit, OnDestroy {

    private _unsubscribe$ = new Subject<void>();
    @Input() item: ITimesheet;
    constructor(private _modal: NzModalRef) {
     }

    ngOnInit(): void { }

    public handleCancel(): void{
        this._modal.destroy();
    }

    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}
