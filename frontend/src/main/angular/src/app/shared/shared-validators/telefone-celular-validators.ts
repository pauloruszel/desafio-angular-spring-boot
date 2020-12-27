import {FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';
import {removerMascara} from "../shared-utils/retirar-mascara.util";
import {CONST_REGEX_UTIL} from "../shared-utils/const-regex-util";

export class TelefoneCelularValidators {

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
                console.log(phoneWithoutBlankSpaces);
                // Retira a mascara => 83999654322
                const phoneWithoutMask = removerMascara(phoneWithoutBlankSpaces);
                if (phoneWithoutMask.length < 10
                    || this.areAllSameDigit(phoneWithoutMask)
                    || !telefoneInformado.value.match(CONST_REGEX_UTIL.REGEX_PHONE)) {
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

}


