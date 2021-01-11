import {Injectable} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRegistration } from 'src/app/core/models/registration';
import { IUser } from 'src/app/core/models/user';

@Injectable()

export class RegistrationService{

    constructor(private _httpClient:HttpClient){}

    public registration(body:IRegistration):Observable<IUser>{
        let params =new HttpParams();
        params = params.set('authorization','false');
        return this._httpClient.post<IUser>('accounts/owners/registration/',body,{params});
    }
}