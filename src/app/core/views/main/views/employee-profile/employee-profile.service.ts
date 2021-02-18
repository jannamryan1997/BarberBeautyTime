import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuthUser } from 'src/app/core/models/auth-user';
import { EmployeData } from 'src/app/core/models/employees';
import { UploadFileResponse } from 'src/app/core/models/upload-file';

@Injectable()

export class EmployeeProfileService {

    constructor(private _httpClient: HttpClient) {
    }

    public getEmployee(): Observable<IAuthUser> {
        return this._httpClient.get<IAuthUser>('auth/user/');
    }
    public changeEmployeeProfile(body: EmployeData): Observable<IAuthUser>{
        return this._httpClient.put<IAuthUser>('auth/user/', body);
    }
    public uploatEmployeeProfileImage(file: FormData): Observable<UploadFileResponse>{
        return this._httpClient.post<UploadFileResponse>('auth/user/avatar/', file);
    }
}
