import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-account',
    templateUrl: 'account.view.html',
    styleUrls: ['account.view.scss']
})

export class AccountViewComponent implements OnInit, OnDestroy {
    private _unsubscribe$ = new Subject<void>();

    constructor() { }

    ngOnInit() { }

    ngOnDestroy() { 
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}