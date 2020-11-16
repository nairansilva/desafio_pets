import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
const TOKEN_KEY = '@PETSMATHUS_token';
@Injectable({
  providedIn: 'root'
})
export class JwtTokenService {

  constructor(private localStorage: LocalStorageService) { }

  get token(){
    return this.localStorage.get(TOKEN_KEY);
  }

  set token(value){
    value ? this.localStorage.set(TOKEN_KEY,value) : this.localStorage.remove(TOKEN_KEY)
  }
}
