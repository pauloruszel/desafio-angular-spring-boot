import {EmailDto} from "./email-dto";
import {TelefoneDto} from "./telefone-dto";
import {EnderecoDto} from "./endereco-dto";

export interface ClienteDto {
  id: number;
  nome?: string;
  cpf?: string;
  endereco?: EnderecoDto;
  email?: EmailDto;
  telefone?: TelefoneDto;
}
