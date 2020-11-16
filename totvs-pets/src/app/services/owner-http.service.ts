import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError, map, first,take } from 'rxjs/operators';
import { Owner } from '../models';
import { JwtTokenService } from './jwt-token.service';

interface ListHttpParams{
  search,
  sort: {column,sort},
  pagination :  Pagination
}

interface Pagination{
  page: number;
  perPage: number;
  total?: number;
}

@Injectable({
  providedIn: 'root'
})
export class OwnerHttpService {

  constructor(private http: HttpClient,private jwtToken: JwtTokenService){
  }

  private baseUrl = 'http://localhost:3333/owner';


  async list({search, sort, pagination } : ListHttpParams): Promise<any> {
    let filterObj = {
      orderCollumn : sort.column,
      orderDir: sort.sort,
      page: pagination.page+'',
      perPage: pagination.perPage+''
    }

    if(search !== ''){
      filterObj = Object.assign({},filterObj,{filter: search});
    }
    const params = new HttpParams({
      fromObject: filterObj
    })

    const dados = await this.http.get(this.baseUrl,{headers: this.header,params}).toPromise()
    return dados
  }


  get(id: string): Observable<Owner> {
    return this.http
    .get<Owner>(`${this.baseUrl}/${id}`,{headers: this.header }).pipe(
      first(),
      catchError((responseError) => this.handleError(responseError))
    );
  }

  async create(data: Owner): Promise<any> {
    const dados = await this.http.post(`${this.baseUrl}`,data,{headers: this.header }).toPromise()
    return dados
  }

  async update(data:Owner):  Promise<any> {
    const dados = await this.http.put(`${this.baseUrl}/${data.id}`,data,{headers: this.header }).toPromise()
    return dados
  }

  async delete(id:string): Promise<any>{
    const dados = await this.http.delete(`${this.baseUrl}/${id}`,{headers: this.header }).toPromise()
    return dados
  }

  get header(){
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.jwtToken.token);
    return headers
  }

  private handleError(error: HttpErrorResponse){
    let errorMessage = ''
    if(error.error instanceof ErrorEvent){
      // erro lado cliente
      errorMessage = `Error : ${error.error.message}`;
    }else{
      switch(error.status){
        case 404:
          errorMessage= 'Recurso não encontrado';
        break;
        default:
          errorMessage = `Erro: código - ${error.status}<br>, Mensagem: ${error.message}`;
      }
    // erro lado servidor

    }
    alert(errorMessage);
    return throwError(error);
  }
}
