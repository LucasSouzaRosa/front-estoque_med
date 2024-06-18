import { FabricanteInterface } from 'src/app/fabricante/types/fabricante.interface';

export interface RemedioInterface {
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
}
