import {AbstractControl} from '@angular/forms';


export class CepValidators {

  /**
   * função que valida o cep
   * @param control - o control do campo
   */
  static isValidCep(isInvalid: boolean = false, control: AbstractControl) {
    if (control.value && (control.value.replace(/\D/gi, '').length < 8 || isInvalid)) {
      return { 'msg.cep.invalido': true };
    }
    return null;
  }

}
