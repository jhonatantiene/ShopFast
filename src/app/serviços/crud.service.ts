import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http: HttpClient) { }

  produtos = {
    read: (param: any = []) => { return this.http.post(environment.address + environment.port + '/produtos/read', param) },
  }

  carrinho = {
    read: (param: any = []) => { return this.http.post(environment.address + environment.port + '/carrinho/read', param) },
    create: (param: any) => { return this.http.post(environment.address + environment.port + '/carrinho/create', param) },
    update: (param: any = []) => { return this.http.post(environment.address + environment.port + '/carrinho/update', param) },
    delete: (param: any = []) => { return this.http.post(environment.address + environment.port + '/carrinho/delete:id', param) },
  }
}
