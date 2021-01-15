import { Component } from '@angular/core';
import { OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-confirm-delete',
    templateUrl: 'confirm-delete.modal.html',
    styleUrls: ['confirm-delete.modal.scss']
})

export class ConfirmDeleteModal implements OnInit, OnDestroy {

    private _unsubscribe$ = new Subject<void>();
    constructor() { }

    ngOnInit() { }

    ngOnDestroy() {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
     }

}