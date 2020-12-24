import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MensageriaService} from "../../../../../shared/shared-services/mensageria-service";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {ClienteService} from "../../../../../shared/shared-services/cliente.service";
import {ClienteDto} from "../../../../../shared/shared-models/dto/cliente-dto";
import {validarNome} from "../../../../../shared/shared-utils/string-utils";
import {DialogConfirmacaoComponent} from "../../../../../shared/shared-components/dialog-confirmacao/dialog-confirmacao.component";

const SO_NUMEROS = /^\d{1,4}$/;

class PaginacaoDTO {
    currentPage: number;
    pageSize?: number;
    sortItem?: any;
    totalResults?: number;
    filtros?: any;
    itens?: Array<any>;
}

class ClientePaginacaoDTO extends PaginacaoDTO {
    nome: string;
    cpf: string;
}

@Component({
    selector: 'app-pesquisar',
    templateUrl: './pesquisar.component.html',
    styleUrls: ['./pesquisar.component.scss']
})
export class PesquisarComponent implements OnInit {

    public colunasCliente = ['codigo', 'nome', 'cpf', 'acoes'];
    public clienteDataSource: ClienteDto[] = [];

    @Output() SubmitEvent = new EventEmitter<object>();
    @ViewChild(MatPaginator) clientePaginator: MatPaginator;

    flagTable = true;

    form: FormGroup;
    clientePaginacaoDTO: ClientePaginacaoDTO;

    // Controle da Tabela
    totalResultados = 0;

    constructor(
        private formBuilder: FormBuilder,
        private clienteService: ClienteService,
        private mensageriaService: MensageriaService,
        public dialog: MatDialog,
        private router: Router) {
    }

    ngOnInit() {
        this.iniciarFormulario();
        this.pesquisarClientes();
    }

    iniciarFormulario() {
        this.form = this.formBuilder.group({
            nome: [null],
            cpf: [null],
        });
    }


    montarClientePaginacaoDTO(): any {
        return {
            nomeCliente: validarNome(this.form.get('nome').value),
            cpfCliente: validarNome(this.form.get('cpf').value),
            currentPage: 0,
            // pageSize: this.clientePaginator.pageSize !== undefined ? this.clientePaginator.pageSize : 10,
            pageSize: 10,
            sortItem: null,
            totalResults: null,
            filtros: null,
            itens: null,
        };
    }

    pesquisaPorEnter(event) {
        if (event.keyCode === 13) {
            this.pesquisarClientes();
        }
    }

    pesquisarClientes() {
        this.clientePaginacaoDTO = this.montarClientePaginacaoDTO();
        this.getClientes();
    }

    configuraPaginaCliente($event?: PageEvent) {
        this.clientePaginacaoDTO = {
            nome: this.clientePaginacaoDTO.nome,
            cpf: this.clientePaginacaoDTO.cpf,
            currentPage: $event.pageIndex,
            pageSize: $event.pageSize,
            sortItem: null,
            totalResults: null,
            filtros: null,
            itens: null,
        };
        this.getClientes();
    }

    get validarFormulario() {
        return this.isCodigoValido() && this.isNomeValido();
    }

    private isExisteNumeros(): boolean {
        const cpf = this.form.get('cpf').value;
        return SO_NUMEROS.test(cpf);
    }

    private isCodigoValido() {
        return this.form.get('cpf').value === null || this.form.get('cpf').value.length === 0 || !this.isExisteNumeros();
    }

    private isNomeValido() {
        return this.form.get('nome').value === null || this.form.get('nome').value.length > 100 || !this.form.get('nome').value.trim();
    }

    async getClientes() {
        this.clienteService.getClientes().subscribe(data => {
            if (data) {
                this.clienteDataSource = data;
                this.flagTable = true;
            } else {
                this.flagTable = false;
            }
        }, error => {
            this.mensageriaService.showMensagemErro(error.mensagem);
        }, () => {
            this.form.reset();
            Object.keys(this.form.controls).forEach(key => {
                this.form.get(key).setErrors(null);
            });
        });
    }

    async deleteCliente(id: number) {
        return this.clienteService.delete(id).subscribe(res => {
            this.mensageriaService.showMensagemSucesso(res.mensagem);
        }, error => {
            this.mensageriaService.showMensagemErro(error.mensagem);
        }, () => {
            this.pesquisarClientes();
        });
    }

    confirmarExclusao(id: number): void {
        const mensagem = 'Tem certeza que deseja excluir o registro?';

        const dialogRef = this.dialog.open(DialogConfirmacaoComponent, {
            maxWidth: '400px',
            data: {titulo: 'Confirmar Exclusão', mensagem: mensagem}
        });

        dialogRef.afterClosed().subscribe(dialogResult => {
            if (dialogResult) {
                this.deleteCliente(id);
            }
        });
    }

    editarCliente(id: number) {
        this.router.navigate([`/editar/${id}`]);
    }

    visualizarCliente(id: number) {
        this.router.navigate([`/visualizar/${id}`]);
    }

    limparCampos(): void {
        this.form.reset();
    }

    cadastrar(): void {
        this.router.navigate([`cliente/cadastrar`]);
    }

}
