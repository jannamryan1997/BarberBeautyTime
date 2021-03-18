import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
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
    public lable: string;
    constructor(
        private _userService: UserService,
        private _translate: TranslateService,
    ) {
        this.role = this._userService.getUserSync().role;
        this.menuItem = this.menuItem.filter((v) => v.roles.includes(this.role));
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
