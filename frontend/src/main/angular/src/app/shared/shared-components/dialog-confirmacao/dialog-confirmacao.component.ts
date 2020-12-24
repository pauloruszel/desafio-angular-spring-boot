import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: 'app-dialog-confirmacao',
    templateUrl: './dialog-confirmacao.component.html',
    styleUrls: ['./dialog-confirmacao.component.scss']
})
export class DialogConfirmacaoComponent {

    titulo: string;
    mensagem: string;

    constructor(public dialogRef: MatDialogRef<DialogConfirmacaoComponent>,
                @Inject(MAT_DIALOG_DATA) public data: { titulo: string, mensagem: string }) {
        dialogRef.disableClose = true;
        this.titulo = data.titulo;
        this.mensagem = data.mensagem;
    }

    onConfirm(): void {
        this.dialogRef.close(true);
    }

    onDismiss(): void {
        this.dialogRef.close(false);
    }

}
