import {FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';
import {CONST_REGEX_UTIL} from "../shared-utils/const-regex-util";


export class CepValidators {

    /**
     * Função que valida o cep
     */
    static isValidCep(): ValidatorFn {
        return (group: FormGroup): ValidationErrors => {
            const cepRetorno = group.controls.cep;
            let cepString = String(group.controls.cep.value);
                cepString = cepString.replace(/\D/g, '');
            if (cepRetorno && cepString !== '') {
                if (!CONST_REGEX_UTIL.REGEX_CEP.test(cepString)) {
                    cepRetorno.setErrors({notEquivalent: true});
                } else {
                    cepRetorno.setErrors(null);
                }
            }
            return;
        };
    }
}
