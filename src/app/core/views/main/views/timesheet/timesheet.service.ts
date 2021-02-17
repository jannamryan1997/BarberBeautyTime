import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBooking } from 'src/app/core/models/booking';
import { IService } from 'src/app/core/models/service';
import { ITimesheet } from 'src/app/core/models/timesheet';

@Injectable()

export class TimesheetService {

    constructor(private _httpClient: HttpClient) { }

    public getEmployeesBookings(start_datetime__date: string, providerId: number, employId: number): Observable<ITimesheet[]> {
        return this._httpClient.get<ITimesheet[]>(`service-providers/${providerId}/employees/${employId}/bookings/?start_datetime__date=${start_datetime__date}`);
    }

    public getServices(providerId: number, employId: number): Observable<IService[]> {
        return this._httpClient.get<IService[]>(`service-providers/${providerId}/employees/${employId}/services/`);
    }

    public createBooking(providerId: number, employId: number, body: IBooking): Observable<any> {
        return this._httpClient.post<any>(`service-providers/${providerId}/employees/${employId}/bookings/`,body);
    }

    public deleteBooking(providerId: number,employId: number,bookingId: number): Observable<any>{
        return this._httpClient.delete<any>(`service-providers/${providerId}/employees/${employId}/bookings/${bookingId}/`);
    }

}


