import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { Subject } from 'rxjs';
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

    constructor(
        private _menuService: MenuService,
        private _router: Router,
        private _cookieService: CookieService,
        private _userService: UserService) {
        // this._menuService.getPageTitle().subscribe((data) => {
        //     this.title = data;
        // });
        this.role = this._userService.getUserSync().role;
        this.menuItem = this.menuItem.filter((v) => v.roles.includes(this.role));
    }

    ngOnInit(): void { }

    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }

    public onClickIsOpen(): void {
        this._isOpen = !this._isOpen;
        this._menuService.setIsOpen(this._isOpen);
    }
    public getBehiviorSubject(value): void {
        this._menuService.setPageTitle(value);
        this.isOpenResponseMenu = false;
    }

    public onClickOpenResponseMenu(): void {
        this.isOpenResponseMenu = !this.isOpenResponseMenu;
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
