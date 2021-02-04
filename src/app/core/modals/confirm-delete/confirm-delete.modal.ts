import { Component } from '@angular/core';
import { OnDestroy, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-confirm-delete',
    templateUrl: 'confirm-delete.modal.html',
    styleUrls: ['confirm-delete.modal.scss']
})

export class ConfirmDeleteModal implements OnInit, OnDestroy {

    private _unsubscribe$ = new Subject<void>();
    constructor(private _modal: NzModalRef) { }

    ngOnInit(): void { }

    public onClickDeleteProvider(): void {
        this._modal.destroy('delete');
    }

    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }

}
