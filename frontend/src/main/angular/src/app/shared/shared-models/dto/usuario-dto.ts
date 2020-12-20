import {ERole} from '../enums/role.enum';

export class UsuarioDto {
  id?: number;
  nomeUsuario?: string;
  email?: string;
  senha?: string;
  roles?: ERole[];
}
