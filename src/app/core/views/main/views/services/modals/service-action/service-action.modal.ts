import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { IService } from 'src/app/core/models/service';

@Component({
    selector: 'app-service-action',
    templateUrl: 'service-action.modal.html',
    styleUrls: ['service-action.modal.scss']
})

export class ServiceActionModal implements OnInit, OnDestroy {

    private _unsubscribe$ = new Subject<void>();
    public serviceDetail: IService;
    @Input() item:IService;
    constructor() { }

    ngOnInit(): void { }

    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}