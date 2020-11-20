import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Pet from '../models/Pet';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Pet[]> {
    return this.http.get<Pet[]>(`${environment.api_url}/pets`);
  }

  getById(id: string): Observable<Pet> {
    return this.http.get<Pet>(`${environment.api_url}/pets/${id}`);
  }

  create(pet: Pet): Observable<Pet> {
    return this.http.post<Pet>(`${environment.api_url}/pets`, pet);
  }

  update(pet: Pet): Observable<Pet> {
    return this.http.put<Pet>(`${environment.api_url}/pets/${pet.id}`, pet);
  }

  delete(id: string): Observable<Pet> {
    return this.http.delete<Pet>(`${environment.api_url}/pets/${id}`);
  }
}
