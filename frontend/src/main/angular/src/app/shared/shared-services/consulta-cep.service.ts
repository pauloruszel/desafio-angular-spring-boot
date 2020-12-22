import {Injectable} from '@angular/core';
import {of} from 'rxjs';
import {CodigoPostalService} from './codigo-postal-service';

const REGEX_CEP = /^[0-9]{8}$/;

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {

  constructor(private cepService: CodigoPostalService) {
  }

  getConsultaCEP(cep: string) {
    // Nova variável "cep" somente com dígitos
    cep = cep.replace(/\D/g, '');

    if (cep !== '') {
      // Expressão regular para validar o CEP.
      // Valida o formato do CEP.
      if (REGEX_CEP.test(cep)) {
        return this.cepService.getCodigoPostalPorNumeroCEP(cep);
      }
    }
    return of({});
  }
}
