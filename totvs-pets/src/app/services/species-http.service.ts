import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtTokenService } from './jwt-token.service';
@Injectable({
  providedIn: 'root'
})
export class SpeciesHttpService {

  constructor(private http: HttpClient,private jwtToken: JwtTokenService){
  }

  private baseUrl = 'http://localhost:3333/species';


  async list(): Promise<any> {

    const dados = await this.http.get(this.baseUrl,{headers: this.header}).toPromise()
    return dados
  }

  get header(){
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.jwtToken.token);
    return headers
  }

}
