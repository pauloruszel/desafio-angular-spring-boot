import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

const urlBase = 'http://viacep.com.br/ws/';

@Injectable({
  providedIn: 'root'
})
export class CodigoPostalService {

  constructor(private  http: HttpClient) {
  }

  getCodigoPostalPorNumeroCEP(cep: string): Observable<any> {
    return this.http.get(`${urlBase}${cep}/json`)
  }


}
