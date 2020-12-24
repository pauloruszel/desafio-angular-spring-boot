import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {DialogConfirmacaoComponent} from "./dialog-confirmacao/dialog-confirmacao.component";

@NgModule({
    imports: [
        CommonModule,
        FlexModule,
        MatButtonModule,
        MatDialogModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule
    ],
    declarations: [
        DialogConfirmacaoComponent,
    ],
    entryComponents: [
        DialogConfirmacaoComponent,
    ],
    exports: [DialogConfirmacaoComponent]
})
export class SharedComponentsModule {
}
