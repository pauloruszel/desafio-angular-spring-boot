/**
 *  Regra de validação do CPF e CNPJ e outras
 * @param value
 */
export function removerMascara(value: any) {

  if (!value) {
    return false;
  }

  if (value === '') {
    return false;
  }

  return value.toString().replace(/[^\d]+/g, '');

}
