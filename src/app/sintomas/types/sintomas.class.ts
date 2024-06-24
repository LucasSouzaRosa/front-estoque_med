import { RemedioInterface } from "src/app/remedio/types/remedio.interface";
import { SintomasInterface } from "./sintomas.interface";
import { isNumber, isString } from '@functions';

export class Sintomas {
    id?: number;
    nome: string;
    remedio: RemedioInterface[];
    ativo: boolean;

    constructor(data: SintomasInterface) {
        this.id = isNumber(data.id);
        this.nome = isString(data.nome);
        this.remedio = Array.isArray(data.remedio) ? data.remedio : [data.remedio]; // Garante que remedio seja um array
        this.ativo = data.ativo;
    }
}
