import { Component, OnDestroy, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-action',
    templateUrl: 'action.modal.html',
    styleUrls: ['action.modal.scss']
})

export class ActionModal implements OnInit, OnDestroy {

    private _unsubscribe$ = new Subject<void>();
  
    constructor(private _modal: NzModalRef) { }

    ngOnInit() { }

    public handleCancel():void{
        this._modal.destroy();
    }

    ngOnDestroy() {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}