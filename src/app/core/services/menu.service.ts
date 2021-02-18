import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()

export class MenuService {
    private _titleEvent$ = new BehaviorSubject<string>(null);
    private _isOpenEvent$ = new BehaviorSubject<boolean>(true);

    constructor() { }

    public setPageTitle(title: string): void {
        this._titleEvent$.next(title);

    }

    public getPageTitle(): Observable<string> {
        return this._titleEvent$.asObservable();
    }

    public setIsOpen(isOpen: boolean): void {
        this._isOpenEvent$.next(isOpen);
    }

    public getIsOpen(): Observable<boolean> {
        return this._isOpenEvent$.asObservable();
    }
}
