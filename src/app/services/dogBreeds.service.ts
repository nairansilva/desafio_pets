import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DogBreedsService {

  private readonly baseURL = 'https://api.thedogapi.com';
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'x-api-key':  'fe26133f-d70f-470c-806f-d54b5a660e0f'
  });

  private readonly options = {
    headers: this.headers
  }

  constructor(
    private http: HttpClient
  ) { }

  getDogBreeds(): Observable<any> {
    return this.http.get(
      this.baseURL + `/v1/breeds`,
      this.options
    );
  }

  getDogBreed(id): Observable<any> {
    return this.http.get(
      this.baseURL + `/v1/breeds/${id}`,
      this.options
    );
  }
}
