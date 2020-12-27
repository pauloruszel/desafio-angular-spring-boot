import {PageDto} from "../shared-models/dto/page-dto";

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

export function replaceStringToCPF(res: PageDto) {
    for (const data of res.content) {
        if (data.cpf) {
            data.cpf = data.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
        }
    }
}
