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
import {PageDto} from "../../../../../shared/shared-models/dto/page-dto";

const SO_NUMEROS = /^\d{1,4}$/;

@Component({
    selector: 'app-pesquisar',
    templateUrl: './pesquisar.component.html',
    styleUrls: ['./pesquisar.component.scss']
})
export class PesquisarComponent implements OnInit {

    public colunasCliente = ['codigo', 'nome', 'cpf', 'acoes'];
    public clienteDataSource: ClienteDto[] = [];
    private paginacao: PageDto;

    @Output() SubmitEvent = new EventEmitter<object>();
    @ViewChild(MatPaginator) clientePaginator: MatPaginator;

    flagTable = true;

    form: FormGroup;

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
        this.getClientesPage();
    }

    reloadPage(): void {
        window.location.reload();
    }

    iniciarFormulario() {
        this.form = this.formBuilder.group({
            nome: [null],
            cpf: [null],
        });
    }

    getClientesPage() {
        this.clienteService.getClientesPage().subscribe(res => {
            this.paginacao = res;
            this.totalResultados = res.content.length;
            this.clienteDataSource = res.content;
        })
    }

    getClientePageByName() {
        const nomeCliente = validarNome(this.form.get('nome').value);
        this.clienteService.getClientesSearchTerm(nomeCliente).subscribe(res => {
            this.paginacao = res;
            this.totalResultados = res.content.length;
            this.clienteDataSource = res.content;
            if (this.totalResultados) {
                this.flagTable = true;
            } else {
                this.flagTable = false;
            }
        })
    }


    pesquisaPorEnter(event) {
        if (event.keyCode === 13) {
            this.pesquisarClientes();
        }
    }

    pesquisarClientes() {
        this.getClientes();
    }

    configuraPaginaCliente($event?: PageEvent) {
        const nomeCliente = validarNome(this.form.get('nome').value);
        this.clienteService.getClientesPerPageAndSize(nomeCliente, $event.pageIndex, $event.pageSize).subscribe(res => {
            this.paginacao = res;
            this.totalResultados = res.content.length;
            this.clienteDataSource = res.content;
            if (this.totalResultados) {
                this.flagTable = true;
            } else {
                this.flagTable = false;
            }
        })
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
            this.totalResultados = data.length;
            if (this.totalResultados) {
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
        this.getClientesPage();
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
        this.router.navigate([`cliente/editar/${id}`]);
    }

    visualizarCliente(id: number) {
        this.router.navigate([`cliente/visualizar/${id}`]);
    }

    limparCampos(): void {
        this.form.reset();
    }

    cadastrar(): void {
        this.router.navigate([`cliente/cadastrar`]);
    }

}
