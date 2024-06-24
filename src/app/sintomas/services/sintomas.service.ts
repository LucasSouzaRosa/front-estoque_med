import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Sintomas } from '../types/sintomas.class';
import { SintomasInterface } from "../types/sintomas.interface";

@Injectable({
    providedIn: 'root'
})
export class SintomasService {

    API_URL = 'http://localhost:3000/sintomas/';

    constructor(
        private httpClient: HttpClient
    ) { }

    save(sintoma: SintomasInterface): Observable<SintomasInterface> {
        return this.httpClient.post<SintomasInterface>(this.API_URL, sintoma);
    }

    getSintoma(id: string): Observable<SintomasInterface> {
        return this.httpClient.get<SintomasInterface>(this.API_URL + id);
    }

    getSintomas(): Observable<Sintomas[]> {
        return this.httpClient
            .get<SintomasInterface[]>(this.API_URL)
            .pipe(
                tap((data) => console.log('Data: ', data)),
                map((data) => {
                    return data.map(item => new Sintomas({
                        id: Number(item.id), // Convertendo para número, se necessário
                        nome: item.nome,
                        ativo: item.ativo,
                        remedio: item.remedio
                    }));
                }),
                tap((data) => console.log('Sintomas: ', data)),
            );
    }

    update(id: string, sintoma: SintomasInterface): Observable<SintomasInterface> {
        return this.httpClient.put<SintomasInterface>(this.API_URL + id, sintoma);
    }

    remove(sintoma: SintomasInterface): Observable<any> {
        return this.httpClient.delete(this.API_URL + sintoma.id);
    }
}
