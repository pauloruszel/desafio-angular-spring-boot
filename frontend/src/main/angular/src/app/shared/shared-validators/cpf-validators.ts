import {AbstractControl} from '@angular/forms';

const MAXIMUM_SIZE_CPF = 11;

export class CpfValidators {
  /**
   * função que valida o cpf
   * @param control - o control do campo
   */
  static isValidCpf(control: AbstractControl) {
    if (control.value && control.value.replace(/\D/gi, '').length < MAXIMUM_SIZE_CPF) {
      return { 'msg.cpf.invalido': true };
    }
    return null;
  }
}
