import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpClientService {

    private baseUrl = 'https://5f779702d5c9cb001623760a.mockapi.io/api/v1/';

    constructor(private http: HttpClient) { }

    get<T>(path: string): Observable<T> {
        const url = this.baseUrl.concat(path);
        return this.http.get<T>(url)
            .pipe(
                catchError(error => throwError(error))
            );
    }

    getById<T>(path: string, id: number): Observable<T> {
        const url = this.baseUrl + path + '/' + id;
        return this.http.get<T>(url)
            .pipe(
                catchError(error => throwError(error))
            );
    }

    getPets<T>(path: string, idOwner: string): Observable<T> {
        const url = this.baseUrl + path + '/' + idOwner + '/pets';
        return this.http.get<T>(url)
            .pipe(
                catchError(error => throwError(error))
            );
    }

    post<T>(path: string, obj: any): Observable<T> {
        const url = this.baseUrl.concat(path);
        return this.http.post<T>(url, obj)
            .pipe(
                catchError(error => throwError(error))
            );
    }

    put<T>(path: string, id: number, obj: any): Observable<T> {
        const url = this.baseUrl + path + '/' + id;
        return this.http.put<T>(url, obj)
            .pipe(
                catchError(error => throwError(error))
            );
    }

    delete<T>(path: string, id: number): Observable<T> {
        const url = this.baseUrl + path + '/' + id;
        return this.http.delete<T>(url)
            .pipe(
                catchError(error => throwError(error))
            );
    }
}
