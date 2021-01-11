import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
    selector:'app-password-change',
    templateUrl:'password-change.view.html',
    styleUrls:['password-change.view.scss']
})

export class PasswordChangeViewComponent implements OnInit,OnDestroy{

    private _unsubscribe$ = new Subject<void>();

    constructor(private _router:Router,private _fb:FormsModule){}

    ngOnInit(){}

    ngOnDestroy(){
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }

}