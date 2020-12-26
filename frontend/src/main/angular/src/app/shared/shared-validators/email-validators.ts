import {FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';
import {CONST_REGEX_UTIL} from "../shared-utils/const-regex-util";

export class EmailValidators {

    /**
     * função que valida o email de acordo com os padroes sefaz
     * @param control - o control do campo
     */
    static isEmailValid(): ValidatorFn {
        return (group: FormGroup): ValidationErrors => {
            const emailRetorno = group.controls.email;
            const emailString = String(group.controls.email.value);

            if (emailRetorno) {
                if (!CONST_REGEX_UTIL.REGEX_EMAIL.test(emailString)) {
                    emailRetorno.setErrors({notEquivalent: true});
                } else {
                    emailRetorno.setErrors(null);
                }
            }
            return;
        };
    }

    static isEmailConfirmValid(): ValidatorFn {
        return (group: FormGroup): ValidationErrors => {
            const confirmarEmailRetorno = group.controls.confirmarEmail;
            const confirmarEmailString = String(group.controls.confirmarEmail.value);

            if (confirmarEmailRetorno.valid) {
                if (!CONST_REGEX_UTIL.REGEX_EMAIL.test(confirmarEmailString)) {
                    confirmarEmailRetorno.setErrors({notEquivalent: true});
                } else {
                    confirmarEmailRetorno.setErrors(null);
                }
            }
            return;
        };

    }
}
