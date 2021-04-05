import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MENU_ITEMS } from 'src/app/core/globals/menu-items';
import { EUserRole } from 'src/app/core/models/auth-user';
import { IMenu } from 'src/app/core/models/menu';
import { MenuService } from 'src/app/core/services/menu.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
    selector: 'app-top-bar',
    templateUrl: 'top-bar.component.html',
    styleUrls: ['top-bar.component.scss']
})

export class TopBarComponent implements OnInit, OnDestroy {
    private _unsubscribe$: Subject<void> = new Subject<void>();
    private _isOpen = true;
    public menuItem: IMenu[] = MENU_ITEMS;
    public role: EUserRole;
    public title: string;
    public isOpenResponseMenu = false;
    public service_provider_id: string;
    public userId: number;

    constructor(
        private _menuService: MenuService,
        private _router: Router,
        private _cookieService: CookieService,
        private _userService: UserService,
        private _translate: TranslateService
    ) {
        this._menuService.getPageTitle()
            .subscribe((data) => {
                if (data) {
                    this.title = data;
                }


            });
        this.role = this._userService.getUserSync().role;
        this.menuItem = this.menuItem.filter((v) => v.roles.includes(this.role));
        if (this._cookieService.get('language')) {
            const lng = this._cookieService.get('language')
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

    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }

    public switchLanguage(language: string): void {
        this._translate.use(language);
        this._cookieService.put('language', language);
    }

    public onClickIsOpen(): void {
        this._isOpen = !this._isOpen;
        this._menuService.setIsOpen(this._isOpen);
    }

    public onClickOpenResponseMenu(): void {
        this.isOpenResponseMenu = !this.isOpenResponseMenu;
    }

    public routePath(item: IMenu): string {
        let path = item.path;
        if (path.includes(':serviceProviderId') && path.includes(':id')) {
            path = path.replace(':serviceProviderId', this.service_provider_id);
            path = path.replace(':id', String(this.userId));

        }
        return path;

    }

    public onClickLogOut(): void {
        this._cookieService.remove('ownerId');
        this._cookieService.remove('service_provider_id');
        this._cookieService.remove('role');
        this._cookieService.remove('refreshToken');
        this._cookieService.remove('accessToken');
        this._router.navigate(['/auth']);
    }
    public onClickRouter(item): void {
        this._router.navigate([item]);
        this.isOpenResponseMenu = false;
    }
}
