import { FabricanteInterface } from "src/app/fabricante/types/fabricante.interface";
import { RemedioInterface } from "./remedio.interface";
import { isNumber, isString } from '@functions';
import { SintomasInterface } from "src/app/sintomas/types/sintomas.interface";
import { TipoEnum } from "./tipoenum";

export class Remedio {
    id?: number;
    nome: string;
    descricao?: string;
    saldo: number;
    tipo: TipoEnum;
    fabricante: FabricanteInterface[];
    dataValidade: Date | null; // Alterado para Date | null
    controlado: boolean;
    sintomas: SintomasInterface[];

    constructor(data: RemedioInterface) {
        this.id = isNumber(data.id) ? data.id : undefined;
        this.nome = isString(data.nome) ? data.nome : '';
        this.descricao = isString(data.descricao) ? data.descricao : undefined;
        this.saldo = isNumber(data.saldo) ? data.saldo : 0;
        this.tipo = data.tipo as TipoEnum;
        this.dataValidade = data.dataValidade !== null ? new Date(data.dataValidade) : null;
        this.controlado = !!data.controlado;
        this.sintomas = data.sintoma || [];
        this.fabricante = Array.isArray(data.fabricante) ? data.fabricante : [data.fabricante];
    }
}
