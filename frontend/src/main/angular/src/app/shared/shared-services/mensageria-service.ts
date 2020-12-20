import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class MensageriaService {

    constructor(private snackBar: MatSnackBar) {
    }

    showMensagemSucesso(mensagem: string) {
        this.snackBar.open(mensagem, 'Sucesso', {
            panelClass: ['style-succes'],
            duration: 3000
        });
    }

    showMensagemErro(mensagem: string) {
        this.snackBar.open(mensagem, 'Erro!', {
            panelClass: ['style-error'],
            duration: 3000
        });
    }

    showMensagemAlerta(mensagem: string) {
        this.snackBar.open(mensagem, 'Alerta!', {
            panelClass: ['style-warn'],
            duration: 3000
        });
    }

    showMensagemInformativa(mensagem: string) {
        this.snackBar.open(mensagem, 'Informativa!', {
            panelClass: ['style-info'],
            duration: 3000
        });
    }
}
