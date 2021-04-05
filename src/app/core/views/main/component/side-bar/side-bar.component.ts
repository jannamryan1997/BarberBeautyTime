
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie';
import { Subject } from 'rxjs';
import { ignoreElements, takeUntil } from 'rxjs/operators';
import { MENU_ITEMS } from 'src/app/core/globals/menu-items';
import { EUserRole } from 'src/app/core/models/auth-user';
import { IMenu } from 'src/app/core/models/menu';
import { UserService } from 'src/app/core/services/user.service';

@Component({
    selector: 'app-side-bar',
    templateUrl: 'side-bar.component.html',
    styleUrls: ['side-bar.component.scss']
})
export class SideBarComponent implements OnInit, OnDestroy {
    private _unsubscribe$: Subject<void> = new Subject<void>();
    public menuItem: IMenu[] = MENU_ITEMS;
    public role: EUserRole;
    public service_provider_id: string;
    public userId: number;
    constructor(
        private _userService: UserService,
        private _translate: TranslateService,
        private _cookieService: CookieService,
    ) {
        this.role = this._userService.getUserSync().role;
        this.menuItem = this.menuItem.filter((v) => v.roles.includes(this.role));
        if (this._cookieService.get('language')) {
            const lng = this._cookieService.get('language');
            _translate.setDefaultLang(lng);
        }
        else {
            _translate.setDefaultLang('en');
        }
        let service_provider_id = this._cookieService.get('service_provider_id');
        if (service_provider_id) {
            this.service_provider_id = service_provider_id;
        }
        this._userService.getUser().pipe(takeUntil(this._unsubscribe$),
        )
            .subscribe((data) => {
                if (data && data?.additional_data && data?.additional_data?.employee?.id) {
                    this.userId = data.additional_data.employee.id;
                }

            });
    }

    ngOnInit(): void { }

    public switchLanguage(language: string): void {
        this._translate.use(language);
        this._cookieService.put('language', language);
    }

    public routePath(item: IMenu): string {
        let path = item.path;
        if (path.includes(':serviceProviderId') && path.includes(':id')) {
            path = path.replace(':serviceProviderId', this.service_provider_id);
            path = path.replace(':id', String(this.userId));

        }
        return path;

    }

    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}
