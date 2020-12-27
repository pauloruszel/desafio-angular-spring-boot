import {FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';
import {CONST_REGEX_UTIL} from "../shared-utils/const-regex-util";

const MAXIMUM_SIZE_CPF = 11;

export class CpfValidators {

    /**
     * função que valida o cpf
     */
    static isValidCpf(): ValidatorFn {
        return (group: FormGroup): ValidationErrors => {
            const cpfRetorno = group.controls.cpf;
            let cpfString = String(group.controls.cpf.value);
            cpfString = cpfString.replace(/\D/g, '');
            if (cpfRetorno && cpfString !== '') {
                if (!CONST_REGEX_UTIL.REGEX_CPF.test(cpfString)) {
                    cpfRetorno.setErrors({notEquivalent: true});
                } else {
                    cpfRetorno.setErrors(null);
                }
            }
            return;
        };
    }
}
