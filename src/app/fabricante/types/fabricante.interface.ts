import { RemedioInterface } from "src/app/remedio/types/remedio.interface";

export interface FabricanteInterface {
  id?: string | null;
  nome: string;
  razaoSocial: string;
  cnpj: string;
  telefone: string;
  ativo: boolean;
  remedios: RemedioInterface[];
  licencaativa: boolean;
}
