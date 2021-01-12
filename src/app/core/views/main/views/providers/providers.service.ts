import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()

export class ProvidersService {

    constructor(private _httpClient: HttpClient) { }
}