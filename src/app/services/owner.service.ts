import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Owner from '../models/Owner';
import Pet from '../models/Pet';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Owner[]> {
    return this.http.get<Owner[]>(`${environment.api_url}/owner`);
  }

  getById(id: string): Observable<Owner> {
    return this.http.get<Owner>(`${environment.api_url}/owner/${id}`);
  }

  getPets(id: string): Observable<Pet[]> {
    return this.http.get<Pet[]>(`${environment.api_url}/owner/${id}/pets`);
  }

  create(owner: Owner): Observable<Owner> {
    return this.http.post<Owner>(`${environment.api_url}/owner`, owner);
  }

  update(owner: Owner): Observable<Owner> {
    return this.http.put<Owner>(`${environment.api_url}/owner/${owner.id}`, owner);
  }

  delete(id: string): Observable<Owner> {
    return this.http.delete<Owner>(`${environment.api_url}/owner/${id}`);
  }
}

