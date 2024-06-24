import { RemedioInterface } from "src/app/remedio/types/remedio.interface";
import { SintomasInterface } from "./sintomas.interface";
import { isString } from '@functions';

export class Sintomas {
    id?: string;
    nome: string;
    remedio: RemedioInterface[];
    ativo: boolean;

    constructor(data: SintomasInterface) {
        this.id = isString(data.id);
        this.nome = isString(data.nome);
        this.remedio = data.remedio;
        this.ativo = data.ativo;
    }
}


