import { FabricanteInterface } from "src/app/fabricante";
import { RemedioInterface } from "./remedio.interface";
import { isNumber, isString } from '@functions';
import { SintomasInterface } from "src/app/sintomas/types/sintomas.interface";

export class Remedio {
    id?: number;
    nome: string;
    descricao?: string;
    saldo: number;
    tipo: TipoEnum;
    fabricante: FabricanteInterface[];
    dataValidade: Date;
    controlado: boolean;
    sintomas: SintomasInterface[];

    constructor(data: RemedioInterface) {
        this.id = isNumber(data.id);
        this.nome = isString(data.nome);
        this.descricao = isString(data.descricao);
        this.saldo = isNumber(data.saldo);
        this.tipo = data.tipo;
        this.dataValidade = new Date(data.dataValidade);
        this.controlado = data.controlado;
        this.sintomas = data.sintoma;
        this.fabricante = Array.isArray(data.fabricante) ? data.fabricante : [data.fabricante];
    }
}


