import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IService } from 'src/app/core/models/service';

@Injectable()

export class ServicesService {
    constructor(private _httpClient: HttpClient) { }

    public getAllService(service_provider_pk: string, employee_pk: number): Observable<IService[]> {
        return this._httpClient.get<IService[]>(`service-providers/${service_provider_pk}/employees/${employee_pk}/services/`);
    }
    public createService(body: IService, service_provider_pk: number, employee_pk: number): Observable<any> {
        return this._httpClient.post<any>(`service-providers/${service_provider_pk}/employees/${employee_pk}/services/`, body);
    }
    public deletedService(service_provider_pk: string, employee_pk: number, serviceId: number): Observable<any> {
        return this._httpClient.delete<any>(`service-providers/${service_provider_pk}/employees/${employee_pk}/services/${serviceId}/`);
    }
    public getServiceById(service_provider_pk: number, employee_pk: number, serviceId: number): Observable<IService> {
        return this._httpClient.get<IService>(`service-providers/${service_provider_pk}/employees/${employee_pk}/services/${serviceId}/`);
    }
    public creteServiceById(body: IService, service_provider_pk: number, employee_pk: number, serviceId: number): Observable<any> {
        return this._httpClient.put<any>(`service-providers/${service_provider_pk}/employees/${employee_pk}/services/${serviceId}/`, body );
    }

}
