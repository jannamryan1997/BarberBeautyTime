import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subject } from 'rxjs';

@Component({
    selector:'app-providers',
    templateUrl:'providers.view.html',
    styleUrls:['providers.view.scss'],
})

export class ProvidersViewComponent implements OnInit,OnDestroy{
    private _unsubscribe$ = new Subject<void>();
    public loading=false;
    public message:string;

    constructor(){}

    ngOnInit(){}

    ngOnDestroy(){
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}