/**
 *  Regra de validação do CPF e CNPJ
 *  @param string cpf cnpj
 */
export function removerMascaraCpfCNPJ(value: any) {

  if (!value) {
    return false;
  }

  if (value === '') {
    return false;
  }

  return value.toString().replace(/[^\d]+/g, '');

}
