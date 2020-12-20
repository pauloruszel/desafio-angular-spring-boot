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

  logar(credencial: CredencialDto): Observable<any> {
    return this.http.post(AUTH_API + 'login', {
      nomeUsuario: credencial.nomeUsuario,
      senha: credencial.senha
    }, httpOptions);
  }

  registrar(usuario: UsuarioDto): Observable<any> {
    return this.http.post(AUTH_API + 'register', {
      nomeUsuario: usuario.nomeUsuario,
      email: usuario.email,
      senha: usuario.senha
    }, httpOptions);
  }
}
