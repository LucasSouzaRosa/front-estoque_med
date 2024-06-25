import { FabricanteInterface } from 'src/app/fabricante/types/fabricante.interface';
import { SintomasInterface } from 'src/app/sintomas/types/sintomas.interface';
import { TipoEnum } from './tipoenum';

export interface RemedioInterface {
  id?: string;
  nome: string;
  descricao: string;
  saldo: number;
  dataValidade: number | null;
  controlado: string;
  fabricante: FabricanteInterface[];
  tipo: string;
  sintoma: SintomasInterface[];
}
