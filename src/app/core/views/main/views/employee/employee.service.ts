import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeData, IEmployees } from 'src/app/core/models/employees';

@Injectable()

export class EmployeeService{

    constructor(private _httpClient: HttpClient){}
    public getEmployees(providerId: number): Observable<IEmployees[]> {
        return this._httpClient.get<IEmployees[]>(`service-providers/${providerId}/employees/`);
    }

    public addEmployees(body: EmployeData): Observable<EmployeData> {
        return this._httpClient.post<EmployeData>('accounts/employees/registration/', body);
    }
    public getEmployeById(providerId: number, employeId: number): Observable<IEmployees> {
        return this._httpClient.get<IEmployees>(`service-providers/${providerId}/employees/${employeId}/`);
    }

    public putchEmploye(providerId: number, employId: number, body: IEmployees): Observable<IEmployees> {
        return this._httpClient.patch<IEmployees>(`service-providers/${providerId}/employees/${employId}/`, body);
    }

    public deleteEmploye(providerId: number, employId: number): Observable<any>{
        return this._httpClient.delete<any>(`service-providers/${providerId}/employees/${employId}/`);
    }
}
