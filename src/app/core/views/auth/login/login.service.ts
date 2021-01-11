import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { ILogin } from 'src/app/core/models/login';
import { IUser } from 'src/app/core/models/user';

@Injectable()

export class LoginService{

    constructor(private _httpClient:HttpClient){}

    public login(body:ILogin):Observable<IUser>{
        return this._httpClient.post<IUser>('auth/login/',body);
    }
}