import { FabricanteInterface } from "src/app/fabricante";
import { RemedioInterface } from "./remedio.interface";
import { isNumber, isString } from '@functions';

export class Remedio {
    id?: number;
    titulo: string;
    subtitulo?: string;
    numeroPaginas: number;
    isbn: string;
    fabricante: FabricanteInterface[];
    editora: string;
    ano: number;
    logoUrl: string;
    preco: number;

    constructor(data: RemedioInterface) {
        this.id = isNumber(data.id);
        this.titulo = isString(data.titulo);
        this.subtitulo = isString(data.subtitulo);
        this.numeroPaginas = isNumber(data.numeroPaginas);
        this.isbn = isString(data.isbn);
        this.editora = isString(data.editora);
        this.ano = isNumber(data.ano);
        this.logoUrl = isString(data.logoUrl);
        this.preco = isNumber(data.preco);
        this.fabricante = data.fabricante;
    }
}


