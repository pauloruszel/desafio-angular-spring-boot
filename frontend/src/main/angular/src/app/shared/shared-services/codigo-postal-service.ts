import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {CodigoPostalDTO} from "../shared-models/dto/codigo-postal-dto";

const urlBase = 'http://viacep.com.br/ws/';

@Injectable({
    providedIn: 'root'
})
export class CodigoPostalService {

    constructor(private  http: HttpClient) {
    }

    getCodigoPostalPorNumeroCEP(cep: string): Observable<CodigoPostalDTO> {
        return this.http.get<CodigoPostalDTO>(`${urlBase}${cep}/json`)
    }


}
