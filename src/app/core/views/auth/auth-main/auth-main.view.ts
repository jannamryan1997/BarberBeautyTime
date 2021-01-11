import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-auth-main',
    templateUrl: 'auth-main.view.html',
    styleUrls: ['auth-main.view.scss']
})

export class AuthMainViewComponent implements OnInit, OnDestroy {
    private _unsubscribe$: Subject<void> = new Subject<void>();

    constructor() { }

    ngOnInit() { }

    ngOnDestroy() {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}
