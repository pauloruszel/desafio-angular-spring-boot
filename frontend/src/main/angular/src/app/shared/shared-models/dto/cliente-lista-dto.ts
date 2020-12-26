import {EmailDto} from "./email-dto";
import {TelefoneDto} from "./telefone-dto";
import {EnderecoDto} from "./endereco-dto";

export interface ClienteListaDto {
  id: number;
  nome?: string;
  cpf?: string;
  endereco?: EnderecoDto;
  emails?: EmailDto[];
  telefones?: TelefoneDto[];
}
