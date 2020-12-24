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

    constructor(protected http: HttpClient) {
    }

    salvar(cliente: ClienteDto): Observable<ClienteDto> {
        return this.http.post<ClienteDto>(`${urlBase}/${path}`, cliente);
    }

    delete(id: number): Observable<MensagemRetorno> {
        return this.http.delete<MensagemRetorno>(`${urlBase}/${path}/${id}`);
    }

    getClientes(): Observable<ClienteDto[]> {
        return this.http.get<ClienteDto[]>(`${urlBase}/${path}`);
    }

    getClientesSearchTerm(nomeCliente: string): Observable<any> {
        return this.http.get<any>(`${urlBase}/${path}/search/?searchTerm=${nomeCliente}`);
    }

    getClientesAll(): Observable<any> {
        return this.http.get<any>(`${urlBase}/${path}/all`);
    }

}
