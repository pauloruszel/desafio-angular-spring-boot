import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TipoTelefoneDto} from '../shared-models/dto/tipo-telefone-dto';

const urlBase = 'http://localhost:8080';
const path = 'tipostelefone';

@Injectable({
    providedIn: 'root'
})
export class TipoContatoService {

    constructor(protected  http: HttpClient) {
    }

    getTiposContato(): Observable<TipoTelefoneDto[]> {
        return this.http.get<TipoTelefoneDto[]>(`${urlBase}/${path}`);
    }

}
