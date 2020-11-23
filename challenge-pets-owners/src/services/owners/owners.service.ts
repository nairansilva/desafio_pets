import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import Owners from 'src/app/models/Owners';
@Injectable({
  providedIn: 'root'
})
export class OwnersService {

  constructor(private http: HttpClient) { }
  url: string = environment.baseUrl;

  getAllOwners(): Observable<Owners[]> {
    return this.http.get<Owners[]>(this.url + '/owner');
  }

   getInfOwners(id: string): Observable<Owners[]> {
    return this.http.get<Owners[]>(this.url + '/owner/' + id);
  }

  updateInfOwner(id: string, owner: Owners): Observable<Owners[]> {
    return this.http.put<Owners[]>(this.url + '/owner/' + id, owner);
  }
  createOwner( owner: Owners): Observable<Owners[]> {
    return this.http.post<Owners[]>(this.url + '/owner/' , owner);
  }
  getPetOwner(id: string, owner: Owners): Observable<Owners[]> {
    return this.http.post<Owners[]>(this.url + '/owner/' + id  , owner);
  }

}
