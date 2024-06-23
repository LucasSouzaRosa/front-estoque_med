import { FabricanteInterface } from 'src/app/fabricante/types/fabricante.interface';

export interface RemedioInterface {
  id?: number;
  nome: string;
  descricao: string;
  saldo: number;
  tipo: TipoEnum;
  dataValidade: Date;
  controlado: boolean;
  fabricante: FabricanteInterface;
  sintomas: SintomasInterface;
}
