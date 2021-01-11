import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { IForgotPassword, IResetPassword } from 'src/app/core/models/forgot-passrord';

@Injectable()

export class ForgotPasswordService{

    constructor(private _httpClient:HttpClient){}

    public forgotPassword(body:IForgotPassword):Observable<IForgotPassword>{
        return this._httpClient.post<IForgotPassword>('auth/password/forget/',body)
    }

    public resetPassword(body:IResetPassword):Observable<IResetPassword>{
        return this._httpClient.post<IResetPassword>('auth/password/reset/',body);
    }

}

