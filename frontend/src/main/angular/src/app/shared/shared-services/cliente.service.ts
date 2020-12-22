import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MensagemRetorno} from '../shared-models/model/mensagem-retorno';
import {ClienteDto} from '../shared-models/dto/cliente-dto';

const urlBase = 'http://localhost:8080';
const path = 'clientes';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(protected  http: HttpClient) {
  }

  salvar(cliente: ClienteDto): Observable<ClienteDto> {
    return this.http.post<ClienteDto>(`${urlBase}/${path}`, cliente);
  }

  delete(id: number): Observable<MensagemRetorno> {
    return this.http.delete<MensagemRetorno>(`${urlBase}/${path}/${id}`);
  }

  getClientesEditar(id: number): Observable<ClienteDto> {
    return this.http.get<ClienteDto>(`${urlBase}/${path}/${id}`);
  }

}