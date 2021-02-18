import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Observable } from 'rxjs';
import { IProvider, IProviderDetails } from 'src/app/core/models/provider';
import { IRegion } from 'src/app/core/models/region';

@Injectable()

export class ProvidersService {

    constructor(private _httpClient: HttpClient, private _cookieService: CookieService) { }

    public uploadFile(formData: FormData): Observable<any> {

        return this._httpClient.post<any>('auth/user/avatar/', formData);
    }
    public getRegion(): Observable<IRegion[]> {
        return this._httpClient.get<IRegion[]>('regions/');
    }

    public getProviders( page: number, size: number, search: string): Observable<IProviderDetails> {
        const ownerId = this._cookieService.get('ownerId');
        let params = new HttpParams();
        if (search) {
            params = params.append('search', search);
        }
    return this._httpClient.get<IProviderDetails>(`service-providers/?owner=${ownerId}` + "&page=" + page + "&size=" + size, { params });
    }
    public createProvider(body: IProvider): Observable<IProvider> {
        return this._httpClient.post<IProvider>('service-providers/', body);
    }

    public deletedProvider(providerId: number): Observable<any> {
        return this._httpClient.delete<any>(`service-providers/${providerId}/`);
    }

    public getProviderById(providerId: number): Observable<IProvider> {
        return this._httpClient.get<IProvider>(`service-providers/${providerId}/`);
    }

    public putchProviderById(providerId: number, body: IProvider): Observable<IProviderDetails> {
        return this._httpClient.patch<IProviderDetails>(`service-providers/${providerId}/`, body);
    }

}

