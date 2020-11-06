import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatBreedsService {

  private readonly baseURL = 'https://api.thecatapi.com';
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'x-api-key': 'fddb6162-9421-43fe-b34c-b339ab35d3e0'
  });


  private readonly options = {
    headers: this.headers
  }

  constructor(
    private http: HttpClient
  ) { }

  getCatBreeds(): Observable<any> {
    return this.http.get(
      this.baseURL + `/v1/breeds/`,
      this.options
    );
  }

  getCatBreed(id): Observable<any> {
    return this.http.get(
      this.baseURL + `/v1/breeds/${id}`,
      this.options
    );
  }
}
