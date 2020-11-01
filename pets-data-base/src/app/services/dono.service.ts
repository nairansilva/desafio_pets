import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Dono } from '../models/dono';

@Injectable({
  providedIn: 'root'
})

export class DonoService {

  url = 'http://localhost:3000/donos'; // api rest fake

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // Obtem todos os donos
  getDonos(): Observable<Dono[]> {
    return this.httpClient.get<Dono[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Obtem um dono pelo id
  getCarById(id: number): Observable<Dono> {
    return this.httpClient.get<Dono>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // salva um dono
  saveDono(dono: Dono): Observable<Dono> {
    return this.httpClient.post<Dono>(this.url, JSON.stringify(dono), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // utualiza um dono
  updateDono(dono: Dono): Observable<Dono> {
    return this.httpClient.put<Dono>(this.url + '/' + dono.id, JSON.stringify(dono), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // deleta um dono
  deleteDono(car: Dono) {
    return this.httpClient.delete<Dono>(this.url + '/' + car.id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
}
