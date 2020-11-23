import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import Owners from 'src/app/models/Pets';
@Injectable({
  providedIn: 'root'
})
export class OwnersService {

  constructor(private http: HttpClient) { }
  url: string = environment.baseUrl;

  getAllOwners(): Observable<Owners[]> {
    return this.http.get<Owners[]>(this.url + '/pets');
  }

   getInfOwners(id: string): Observable<Owners[]> {
    return this.http.get<Owners[]>(this.url + '/pets/' + id);
  }

  updateInfOwner(id: string, pet: Owners): Observable<Owners[]> {
    return this.http.put<Owners[]>(this.url + '/pets/' + id, pet);
  }
  createOwner( pet: Owners): Observable<Owners[]> {
    return this.http.post<Owners[]>(this.url + '/pets/' , pet);
  }
  getPetOwner(id: string, pet: Owners): Observable<Owners[]> {
    return this.http.post<Owners[]>(this.url + '/owner/' + id  , pet);
  }

}
