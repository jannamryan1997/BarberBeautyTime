import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .pipe(
                catchError((err: HttpErrorResponse) => {
                    const error = err.error;
                    let message = '';
                    for (const key in error) {
                        if (key && error[key]) {
                            for (const msg of error[key]) {
                                message += `${key} - ${msg} \n`;
                            }
                        }
                    }
                    return throwError({ message });
                })
            );
    }
}
