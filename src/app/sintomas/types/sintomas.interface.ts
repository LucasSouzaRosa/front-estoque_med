import { RemedioInterface } from "src/app/remedio/types/remedio.interface";

export interface SintomasInterface {
  id?: number;
  nome: string;
  remedio: RemedioInterface;
  ativo: boolean;
 
}
