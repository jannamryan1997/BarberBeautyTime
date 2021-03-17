import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-auth',
    templateUrl: 'auth.view.html',
    styleUrls: ['auth.view.scss']
})

export class AuthViewComponent implements OnInit, OnDestroy {
    private _unsubscribe$: Subject<void> = new Subject<void>();

    constructor(private _translate: TranslateService) {
        _translate.setDefaultLang('arm');
     }

    ngOnInit(): void { }
    public switchLanguage(language: string): void {
        this._translate.use(language);
      }
    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}

