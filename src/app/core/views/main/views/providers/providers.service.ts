import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProvider, IProviderDetails } from 'src/app/core/models/provider';

@Injectable()

export class ProvidersService {

    constructor(private _httpClient: HttpClient) { }

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
}