import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Sintomas } from '../types/sintomas.class';
import { Observable, map, tap } from "rxjs";
import { SintomasInterface } from "../types/sintomas.interface";

@Injectable({
    providedIn: 'root'
})
export class SintomasService {


    API_URL = 'http://localhost:3000/remedios/';

    constructor(
        private httpClient: HttpClient
    ) { }

    save(remedio: any) {
        return this.httpClient
            .post<SintomasInterface>(this.API_URL, remedio);
    }

    getSintoma(id: string) {
        return this.httpClient.get<SintomasInterface>(this.API_URL + id);
    }

    getSintomas(): Observable<Sintomas[]> {
        return this.httpClient
            .get<Sintomas[]>(this.API_URL)
            .pipe(
                tap((data) => console.log('Data: ', data)),
                map((data) => {
                    return data.map(item => new Sintomas(item))
                }),
                tap((data) => console.log('Data: ', data)),
            )
    }

    update(id: string, remedio: any) {
        return this.httpClient.put(
            this.API_URL + id, remedio
        )
    }

    remove(remedio: Sintomas) {
        return this.httpClient.delete(
            this.API_URL + remedio.id
        )
    }
}