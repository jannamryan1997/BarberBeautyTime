import { HttpClient, HttpParams } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { IChangedPassword } from 'src/app/core/models/changed-password';

@Injectable()

export class PasswordChangeService{

    constructor(private _httpClient:HttpClient){}

    public changedPassword(body:IChangedPassword):Observable<IChangedPassword>{
    return this._httpClient.post<IChangedPassword>('auth/password/change/',body)
    }
}