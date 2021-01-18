import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmployees } from 'src/app/core/models/employees';
import { IProvider, IProviderDetails } from 'src/app/core/models/provider';
import { IRegion } from 'src/app/core/models/region';

@Injectable()

export class ProvidersService {

    constructor(private _httpClient: HttpClient) { }

    public getRegion():Observable<IRegion[]>{
        return this._httpClient.get<IRegion[]>('regions/');
    }

    public getProviders(search:string):Observable<IProviderDetails>{
        let params= new HttpParams();
        if(search){
            params = params.append('search',search)
        }
        return this._httpClient.get<IProviderDetails>('service-providers/',{params});
    }
    public createProvider(body:IProvider):Observable<IProvider>{
        return this._httpClient.post<IProvider>('service-providers/',body);
    }

    public deletedProvider(providerId:number):Observable<any>{
        return this._httpClient.delete<any>(`service-providers/${providerId}/`);
    }

    public getProviderById(providerId:number):Observable<IProvider>{
        return this._httpClient.get<IProvider>(`service-providers/${providerId}/`);
    }

    public putchProviderById(providerId:number,body:IProvider):Observable<IProviderDetails>{
        return this._httpClient.patch<IProviderDetails>(`service-providers/${providerId}/`,body);
    }

    public getEmployees(providerId:number):Observable<IEmployees[]>{
        return this._httpClient.get<IEmployees[]>(`service-providers/${providerId}/employees/`);
    }

}

