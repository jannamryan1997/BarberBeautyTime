import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuthUser } from 'src/app/core/models/auth-user';

@Injectable()

export class EmployeeProfileService {

    constructor(private _httpClient: HttpClient) {
    }

    public getEmployee(): Observable<IAuthUser> {
        return this._httpClient.get<IAuthUser>('auth/user/');
    }
}
