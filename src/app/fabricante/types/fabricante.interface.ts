import { RemedioInterface } from "src/app/remedio/types/remedio.interface";

export interface FabricanteInterface {
  id?: string | null;
  razaoSocial: string;
  cnpj: string;
  email: string,
  telefone: string;
  ativo: boolean;
  remedios: RemedioInterface[];
  licencaativa: boolean;
}
