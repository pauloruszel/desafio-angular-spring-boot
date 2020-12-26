import {FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';
import {removerMascara} from "../shared-utils/retirar-mascara.util";

export class TelefoneCelularValidators {

    private static REGEX_10_DIGITOS = /^\(?[1-9]{2}\)?[\s-]?\d{4}-?\d{4}$/;
    private static REGEX_11_DIGITOS = /^\(?[1-9]{2}\)[\s-][9]{1}[\s-]?\d{4}-\d{4}$/;
    private static REGEX_TELEFONE_DDI = /^\+?\d{2}?\s*\(\d{2}\)?\s*\d{4,5}\-?\d{4}$/g;

    /**
     * função que valida o celular
     * @param control - o control do campo
     */
    static isValidCellPhone(): ValidatorFn {
        return (group: FormGroup): ValidationErrors => {
            const telefoneInformado = group.controls.telefone;
            // verifica se possui valor
            if (telefoneInformado.value) {
                // Elimina os espacos vazios => (83) 9 9965-4322
                const phoneWithoutBlankSpaces = telefoneInformado.value.replace(/ /g, '');
                // Retira a mascara => 83999654322
                const phoneWithoutMask = removerMascara(phoneWithoutBlankSpaces);
                // Identifica qual a mascara que deve validar o numero digitado
                const phoneMask = this.regexByLength(phoneWithoutMask);
                if (phoneWithoutMask.length < 10
                    || this.areAllSameDigit(phoneWithoutMask)
                    || !telefoneInformado.value.match(phoneMask)) {
                    telefoneInformado.setErrors({notEquivalent: true});
                } else {
                    telefoneInformado.setErrors(null);
                }
            }
            return;
        };
    }

    /**
     * Verifica se todos os numeros do telefone sao iguais
     * @param value Numero do telefone a ser testado
     */
    private static areAllSameDigit(value: string): boolean {
        return value.split('').every(char => char === value[0]);
    }

    private static regexByLength(phoneWithoutMask: any): void {
        let phoneMask: any;
        if (phoneWithoutMask.length === 10) {
            phoneMask = this.REGEX_10_DIGITOS;
        } else if (phoneWithoutMask.length === 11) {
            phoneMask = this.REGEX_11_DIGITOS;
        } else if (phoneWithoutMask.length >= 12) {
            phoneMask = this.REGEX_TELEFONE_DDI;
        }
        return phoneMask;
    }
}


