import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http: HttpClient) { }

  carrinho = {
    read: () => { return this.http.get(environment.address + environment.port + '/carrinho/read') },
    create: () => { },
    update: () => { },
    delete: () => { },
  }
}
