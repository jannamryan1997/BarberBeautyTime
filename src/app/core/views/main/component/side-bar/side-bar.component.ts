import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { MENU_ITEMS } from 'src/app/core/globals/menu-items';
import { EUserRole } from 'src/app/core/models/auth-user';
import { IMenu } from 'src/app/core/models/menu';
import { MenuService } from 'src/app/core/services/menu.service';
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

    constructor(private _menuService: MenuService, private _router: Router, private _userService: UserService) {
        this.role = this._userService.getUserSync().role;
        this.menuItem = this.menuItem.filter((v) => v.roles.includes(this.role));
    }

    ngOnInit(): void {}

 
    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}
