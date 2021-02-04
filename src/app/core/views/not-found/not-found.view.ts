import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-not-found',
    templateUrl: 'not-found.view.html',
    styleUrls: ['not-found.view.scss']
})

export class NotFoundViewComponent implements OnInit, OnDestroy {
    private _unsubscribe$ = new Subject<void>();
    constructor() { }

    ngOnInit(): void { }

    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}
