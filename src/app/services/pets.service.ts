import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PetsService {

  private readonly baseURL = 'https://5f779702d5c9cb001623760a.mockapi.io/api/v1';

  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  private readonly options = {
    headers: this.headers
  }

  constructor(
    private http: HttpClient
  ) { }

  postPet(form): Observable<any>{
    let nascimento = form.nascimento.split("/").reverse().join("-")

    let bodyObj = {
      ownerId: form.id_dono,
      name: form.nome,
      nickName: form.apelido,
      breed: form.raca,
      size: parseInt(form.tamanho),
      birthday: Date.parse(nascimento),
      species: parseInt(form.especie)
    };

    return this.http.post(
      this.baseURL + `/owner/${form.id_dono}/pets`,
      bodyObj,
      this.options
    );
  }

  putPet(form): Observable<any>{
    let nascimento = form.nascimento.split("/").reverse().join("-")

    let bodyObj = {
      ownerId: form.id_dono,
      name: form.nome,
      nickName: form.apelido,
      breed: form.raca,
      size: form.tamanho,
      birthday: Date.parse(nascimento),
      species: form.especie
    };

    return this.http.put(
      this.baseURL + `/owner/${form.id_dono}/pets/${form.id}`,
      bodyObj,
      this.options
    );
  }

  getPet({ id, id_dono }): Observable<any> {
    return this.http.get(
      this.baseURL + `/owner/${id_dono}/pets/${id}`,
      this.options
    );
  }

  deletePet({ id, id_dono }): Observable<any> {
    return this.http.delete(
      this.baseURL + `/owner/${id_dono}/pets/${id}`,
      this.options
    );
  }
}
