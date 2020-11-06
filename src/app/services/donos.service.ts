import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DonosService {

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

  getDonos(): Observable<any> {
    return this.http.get(
      this.baseURL + '/owner',
      this.options
    );
  }

  getDono(id): Observable<any> {
    return this.http.get(
      this.baseURL + `/owner/${id}`,
      this.options
    );
  }

  putDono(form): Observable<any> {
    let bodyObj = {
      name: form.nome,
      email: form.email,
      address: form.endereco,
      birthday: Date.parse(form.nascimento),
      phone: form.telefone
    };

    return this.http.put(
      this.baseURL + `/owner/${form.id}`,
      bodyObj,
      this.options
    );
  }

  postDono(form): Observable<any>{
    let nascimento = form.nascimento.split("/").reverse().join("-")

    let bodyObj = {
      name: form.nome,
      email: form.email,
      address: form.endereco,
      birthday: Date.parse(nascimento),
      phone: form.telefone
    };

    return this.http.post(
      this.baseURL + '/owner',
      bodyObj,
      this.options
    );
  }

  deleteDono(id): Observable<any> {
    return this.http.delete(
      this.baseURL + `/owner/${id}`,
      this.options
    );
  }

  getDonoPets(id): Observable<any> {
    return this.http.get(
      this.baseURL + `/owner/${id}/pets`,
      this.options
    );
  }
}
