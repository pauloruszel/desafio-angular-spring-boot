/**
 *  Formata a data como string de DD-MM-YYYY para YYYY-MM-DD
 *
 *  @param s string
 */
export function reformatDateString(s): string {
    const b = s.split(/\D/);
    return b.reverse().join('-');
}

export function validarNome(value: any): string {
    if (value !== null && value !== '') {
        return value.toString().trim();
    } else {
        return '';
    }
}
