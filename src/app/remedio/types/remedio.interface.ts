import { FabricanteInterface } from 'src/app/fabricante/types/fabricante.interface';
import { SintomasInterface } from 'src/app/sintomas/types/sintomas.interface';

export interface RemedioInterface {
  id?: number;
  nome: string;
  descricao: string;
  saldo: number;
  tipo: TipoEnum;
  dataValidade: Date;
  controlado: boolean;
  fabricante: FabricanteInterface;
  sintoma: SintomasInterface;
}
