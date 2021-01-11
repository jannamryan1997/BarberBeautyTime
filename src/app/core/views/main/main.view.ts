import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MenuService } from '../../services/menu.service';

@Component({
    selector: 'app-main',
    templateUrl: 'main.view.html',
    styleUrls: ['main.view.scss']
})

export class MainViewComponent implements OnInit, OnDestroy {

    private _unsubscribe$: Subject<void> = new Subject<void>();
    public isOpen: boolean;
    constructor(private _menuService: MenuService) {
        this._menuService.getIsOpen()
            .subscribe((data) => {
                this.isOpen = data;
            })
    }

    ngOnInit() { }

    ngOnDestroy() {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}
