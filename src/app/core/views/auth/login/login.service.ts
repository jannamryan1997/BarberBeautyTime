import { HttpClient, HttpParams } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { ILogin } from 'src/app/core/models/login';
import { IUser } from 'src/app/core/models/user';

@Injectable()

export class LoginService{

    constructor(private _httpClient:HttpClient){}

    public login(body:ILogin):Observable<IUser>{
        let params=new HttpParams();
        params=params.set('authorization','false')
        return this._httpClient.post<IUser>('auth/login/',body,{params});
    }
}