import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CredencialDto} from '../../../shared/shared-models/dto/credencial-dto';
import {UsuarioDto} from '../../../shared/shared-models/dto/usuario-dto';

const AUTH_API = 'http://localhost:8080/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  logar(credencialDto: CredencialDto): Observable<any> {
    return this.http.post(AUTH_API + 'login', {
      usuario: credencialDto.usuario,
      senha: credencialDto.senha
    }, httpOptions);
  }

  registrar(usuarioDto: UsuarioDto): Observable<any> {
    return this.http.post(AUTH_API + 'register', {
      usuario: usuarioDto.usuario,
      email: usuarioDto.email,
      senha: usuarioDto.senha
    }, httpOptions);
  }
}
