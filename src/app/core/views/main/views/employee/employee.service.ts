import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { IEmployees } from 'src/app/core/models/employees';

@Injectable()

export class EmployeeService{

    constructor(private _httpClient: HttpClient){}
    public getEmployees(providerId: number): Observable<IEmployees[]> {
        return this._httpClient.get<IEmployees[]>(`service-providers/${providerId}/employees/`);
    }
}
