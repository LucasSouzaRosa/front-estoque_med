import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FabricanteInterface } from '../types/fabricante.interface';

@Injectable({
  providedIn: 'root'
})
export class FabricanteService {

  private url = 'http://localhost:3000/fabricantes';

  constructor(
    private httpClient: HttpClient
  ) {}

  getFabricantes(): Observable<FabricanteInterface[]> {
    return this.httpClient.get<FabricanteInterface[]>(this.url);
  }

  excluir(id: string): Observable<Object> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  getFabricante(id: string): Observable<FabricanteInterface> {
    return this.httpClient.get<FabricanteInterface>(`${this.url}/${id}`);
  }

  private adicionar(fabricante: FabricanteInterface)  {
    return this.httpClient.post(this.url, fabricante);
  }

  private atualizar(fabricante: FabricanteInterface) {
    return this.httpClient.put(`${this.url}/${fabricante.id}`, fabricante);
  }

  salvar(fabricante: FabricanteInterface) {
    if(fabricante.id) {
      return this.atualizar(fabricante);
    } else {
      return this.adicionar(fabricante);
    }
  }
}
