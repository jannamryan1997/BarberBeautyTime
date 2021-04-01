import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-auth',
    templateUrl: 'auth.view.html',
    styleUrls: ['auth.view.scss']
})

export class AuthViewComponent implements OnInit, OnDestroy {
    private _unsubscribe$: Subject<void> = new Subject<void>();

    constructor(private _translate: TranslateService,private _cookieService:CookieService) {
        if(this._cookieService.get('language')){
            const lng = this._cookieService.get('language')
            _translate.setDefaultLang(lng);
        }
        else{
            _translate.setDefaultLang('en');
        }
      
     }

    ngOnInit(): void { }
    public switchLanguage(language: string): void {
        this._translate.use(language);
        this._cookieService.put('language',language)
      }
    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}

