import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IAuthUser } from '../models/auth-user';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private _user: IAuthUser;
    private _userState$: BehaviorSubject<IAuthUser> = new BehaviorSubject<IAuthUser>(null);

    constructor(
        private _httpClient: HttpClient
    ) { }

    public fetchUser(): Observable<IAuthUser> {
        return this._httpClient.get<IAuthUser>('auth/user');
    }

    public setUser(user: IAuthUser): void {
        this._user = user;
        this._userState$.next(user);
    }

    public getUserSync(): IAuthUser {
        return this._user;
    }

    public getUser(): Observable<IAuthUser> {
        return this._userState$.asObservable()
            .pipe(filter((v) => v !== null));
    }

}
