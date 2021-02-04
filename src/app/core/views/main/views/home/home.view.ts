import { Component, OnDestroy, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-home',
    templateUrl: 'home.view.html',
    styleUrls: ['home.view.scss']
})

export class HomeViewComponent implements OnInit, OnDestroy {

    private _unsubscribe$ = new Subject<void>();
    public date: Date = new Date();

    constructor(private _nzModalService: NzModalService) { }

    ngOnInit(): void {
    }

    public onValueChange(value: Date): void {
        this.date = value;

    }

    public onPanelChange(change: { date: Date; mode: string }): void {
    }

    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}
