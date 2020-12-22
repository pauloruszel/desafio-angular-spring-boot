import {TipoTelefoneDto} from "./tipo-telefone-dto";

export interface TelefoneDto {
  id?: number;
  numeroTelefone?: string;
  tipoTelefone?: TipoTelefoneDto;
}
