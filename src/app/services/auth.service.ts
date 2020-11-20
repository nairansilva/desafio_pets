import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Owner from '../models/Owner';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(owners: Owner[], email: string): boolean {
    const userFound = owners.filter(user => { return user.email === email; })[0];
      
      if (userFound) {
        localStorage.setItem('pets@token', userFound.email);
        return true;
      }
      else return false;
  }

  logout(): void {
    localStorage.removeItem('pets@token');
  }

  verifyToken(): boolean {
    const email = localStorage.getItem('pets@token');

    if(email) return true;
    else return false;
  }
}
