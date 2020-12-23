import {ERole} from '../enums/role.enum';

export class UsuarioDto {
  id?: number;
  usuario?: string;
  email?: string;
  senha?: string;
  roles?: ERole[];
}
