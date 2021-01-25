import { Component, OnDestroy, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subject } from 'rxjs';
import { ActionModal } from './modals';

@Component({
    selector: 'app-home',
    templateUrl: 'home.view.html',
    styleUrls: ['home.view.scss']
})

export class HomeViewComponent implements OnInit, OnDestroy {

    private _unsubscribe$ = new Subject<void>();
    public date: Date = new Date();

    constructor(private _NzModalService: NzModalService) { }

    ngOnInit() {
    }

    public onValueChange(value: Date): void {
        this.date = value;

    }

    public onPanelChange(change: { date: Date; mode: string }): void {
    }

    public showModal(): void {
        this._NzModalService.create({
            nzTitle: '12:30 rese',
            nzContent: ActionModal
        })
    }

    ngOnDestroy() {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}