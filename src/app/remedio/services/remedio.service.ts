import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Remedio } from '../types/remedio.class';
import { Observable, map, tap } from "rxjs";
import { RemedioInterface } from "../types/remedio.interface";

@Injectable({
    providedIn: 'root'
})
export class RemedioService {


    API_URL = 'http://localhost:3000/remedios/';

    constructor(
        private httpClient: HttpClient
    ) { }

    save(remedio: any) {
        return this.httpClient
            .post<RemedioInterface>(this.API_URL, remedio);
    }

    getRemedio(id: string) {
        return this.httpClient.get<RemedioInterface>(this.API_URL + id);
    }

    getRemedios(): Observable<Remedio[]> {
        return this.httpClient
            .get<Remedio[]>(this.API_URL)
            .pipe(
                tap((data) => console.log('Data: ', data)),
                map((data) => {
                    return data.map(item => new Remedio(item))
                }),
                tap((data) => console.log('Data: ', data)),
            )
    }

    update(id: string, remedio: any) {
        return this.httpClient.put(
            this.API_URL + id, remedio
        )
    }

    remove(remedio: Remedio) {
        return this.httpClient.delete(
            this.API_URL + remedio.id
        )
    }
}