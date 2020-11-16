import { Injectable } from '@angular/core';
import { JwtTokenService } from './jwt-token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public check: Boolean = false;

  constructor(private jwtToken: JwtTokenService) {
    this.check = this.jwtToken.token ? true : false
  }

  logout(){
    this.jwtToken.token = null;
    this.check = false;
  }
}
