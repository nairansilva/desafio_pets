import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import Pets from 'src/app/models/Pets';


@Injectable({
  providedIn: 'root'
})
export class PetsService {

  url: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAllPets(): Observable<Pets[]> {
    return this.http.get<Pets[]>(this.url + '/pets');
  }

   getInfoPet(id: string): Observable<Pets[]> {
    return this.http.get<Pets[]>(this.url + '/pets/' + id);
  }
  deletePet(id: string): Observable<Pets[]> {
    return this.http.delete<Pets[]>(this.url + '/pets/' + id);
  }
  updateInfoPet( id:string, pet: Pets): Observable<Pets[]> {
    return this.http.put<Pets[]>(this.url + '/pets/' + id , pet);
  }
  createPet( pet: Pets): Observable<Pets[]> {
    return this.http.post<Pets[]>(this.url + '/pets/' , pet);
  }

}
