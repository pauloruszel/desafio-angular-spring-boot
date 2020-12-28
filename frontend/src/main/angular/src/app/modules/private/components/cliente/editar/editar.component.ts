import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TipoTelefoneDto} from "../../../../../shared/shared-models/dto/tipo-telefone-dto";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ClienteService} from "../../../../../shared/shared-services/cliente.service";
import {ConsultaCepService} from "../../../../../shared/shared-services/consulta-cep.service";
import {MensageriaService} from "../../../../../shared/shared-services/mensageria-service";
import {TipoContatoService} from "../../../../../shared/shared-services/tipo-contato.service";
import {ClienteDto} from "../../../../../shared/shared-models/dto/cliente-dto";
import {removerMascara} from "../../../../../shared/shared-utils/retirar-mascara.util";
import {EnderecoDto} from "../../../../../shared/shared-models/dto/endereco-dto";
import {EmailDto} from "../../../../../shared/shared-models/dto/email-dto";
import {TelefoneDto} from "../../../../../shared/shared-models/dto/telefone-dto";
import {ClienteListaDto} from "../../../../../shared/shared-models/dto/cliente-lista-dto";
import {DialogConfirmacaoComponent} from "../../../../../shared/shared-components/dialog-confirmacao/dialog-confirmacao.component";
import {MatDialog} from "@angular/material/dialog";
import {ErrorDto} from "../../../../../shared/shared-models/dto/error-dto";
import {EmailValidators} from "../../../../../shared/shared-validators/email-validators";
import {CepValidators} from "../../../../../shared/shared-validators/cep-validators";
import {CpfValidators} from "../../../../../shared/shared-validators/cpf-validators";
import {TelefoneCelularValidators} from "../../../../../shared/shared-validators/telefone-celular-validators";

@Component({
    selector: 'app-editar',
    templateUrl: './editar.component.html',
    styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit {

    form: FormGroup;
    tiposDeContatos: TipoTelefoneDto[] = [];
    tipoContatoSelecionado: number;
    cliente: ClienteListaDto = null;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        public dialog: MatDialog,
        private clienteService: ClienteService,
        private consultaCepService: ConsultaCepService,
        private mensageriaService: MensageriaService,
        private tipoContatoService: TipoContatoService) {

    }

    public isEmailValid = EmailValidators.isEmailValid();
    public isCepValid = CepValidators.isValidCep();
    public isCpfValid = CpfValidators.isValidCpf();
    public isTelefoneValid = TelefoneCelularValidators.isValidCellPhone();

    ngOnInit() {
        this.iniciarFormulario();
        this.tipoContatoService.getTiposContato().subscribe(rs => this.tiposDeContatos = rs);
        this.getClientesEdicao();
    }

    getClientesEdicao() {
        this.route.params.subscribe((params: Params) => {
            this.clienteService.getClientesEditar(params.id).subscribe((res: ClienteListaDto) => {
                this.montarClienteDTO(res);
            }, error => {
                this.mensageriaService.showMensagemErro(error.error.message);
            });
        });

    }

    recuperarDadosFormulario(response: ClienteListaDto) {
        this.form.patchValue(
            {
                nome: response.nome,
                cpf: response.cpf,
                cep: response.endereco.cep,
                logradouro: response.endereco.logradouro,
                bairro: response.endereco.bairro,
                cidade: response.endereco.cidade,
                uf: response.endereco.uf,
                complemento: response.endereco.complemento,
                tipoContato: response.telefones[0].tipoTelefone.id,
                telefone: response.telefones[0].numeroTelefone,
                email: response.emails[0].descricaoEmail,
            });
    }


    montarClienteDTO(response: ClienteListaDto) {
        if (response) {
            this.cliente = response;
            this.tipoContatoSelecionado = this.cliente.telefones[0].tipoTelefone.id
            this.recuperarDadosFormulario(this.cliente);
        } else {
            this.mensageriaService.showMensagemErro("Cliente não encontrado(a)");
        }
    }

    iniciarFormulario() {
        this.form = this.formBuilder.group({
            nome: [{value: '', disabled: true}, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
            cpf: [null, [Validators.required]],
            cep: [null, [Validators.required]],
            logradouro: [null, [Validators.required]],
            bairro: [null, [Validators.required]],
            cidade: [null, [Validators.required]],
            uf: [null, [Validators.required]],
            complemento: [null],
            tipoContato: [null, [Validators.required]],
            telefone: [null, Validators.compose([Validators.required])],
            email: [null, [Validators.required, Validators.minLength(10)]],
        })
        this.form.setValidators(Validators.compose([
            this.isEmailValid,
            this.isCepValid,
            this.isCpfValid,
            this.isTelefoneValid]));
    }

    getConsultaCEP() {
        const cep = this.form.get('cep').value;
        if (cep != null && cep !== '') {
            this.resetDadosCep();
            this.consultaCepService.getConsultaCEP(cep).subscribe(dados => {
                this.populaDadosCep(dados);
            }, () => {
                this.mensageriaService.showMensagemAlerta('O CEP não encontrado.');
            });
        }
    }

    populaDadosCep(dados) {
        let retorno: ErrorDto;
        retorno = dados;
        if (!retorno.erro) {
        this.form.patchValue(
            {
                logradouro: dados.logradouro,
                bairro: dados.bairro,
                cidade: dados.localidade,
                uf: dados.uf,
                complemento: dados.complemento,
            });
        } else {
            this.mensageriaService.showMensagemAlerta('O CEP não foi encontrado.');
        }
    }

    resetDadosCep() {
        this.form.patchValue({
            logradouro: null,
            bairro: null,
            cidade: null,
            uf: null,
            complemento: null,
        });
    }

    montarDadosClienteEdicao(): ClienteDto {
        return {
            id: this.cliente.id,
            nome: this.form.get('nome').value,
            cpf: removerMascara(this.form.get('cpf').value),
            endereco: this.montarEndereco(),
            email: this.montarEmail(),
            telefone: this.montarTelefone()
        };
    }

    montarEndereco(): EnderecoDto {
        return {
            id: this.cliente.endereco.id,
            cep: removerMascara(this.form.get('cep').value),
            logradouro: this.form.get('logradouro').value,
            bairro: this.form.get('bairro').value,
            cidade: this.form.get('cidade').value,
            uf: this.form.get('uf').value,
            complemento: this.form.get('complemento').value,
        };
    }

    async create(cliente: ClienteListaDto) {
        const mensagem = 'Confirma o cadastro ?';

        const dialogRef = this.dialog.open(DialogConfirmacaoComponent, {
            maxWidth: '400px',
            data: {titulo: 'Confirmar Cadastro', mensagem: mensagem}
        });

        dialogRef.afterClosed().subscribe(dialogResult => {
            if (dialogResult) {
                this.salvar(cliente);
            }
        });
    }

    private async salvar(cliente: any) {
        cliente = this.montarDadosClienteEdicao();

        if (this.form.valid) {
            this.clienteService.salvar(cliente).subscribe(() => {
                this.mensageriaService.showMensagemSucesso('Dados salvos com Sucesso!')
            }, error => {
                this.mensageriaService.showMensagemInformativa(error.message);
            }, () => {
                this.form.reset();
                Object.keys(this.form.controls).forEach(key => {
                    this.form.get(key).setErrors(null);
                });

                this.goToPesquisar();
            });
        }
    }

    montarEmail(): EmailDto {
        return {
            id: this.cliente.emails[0].id,
            descricaoEmail: this.form.get('email').value,
        };
    }

    montarTelefone(): TelefoneDto {
        return {
            id: this.cliente.telefones[0].id,
            numeroTelefone: this.form.get('telefone').value,
            tipoTelefone: this.montarTipoTelefone(),
        };
    }

    montarTipoTelefone(): TipoTelefoneDto {
        return {
            id: this.form.get('tipoContato').value,
            descricaoTipoTelefone: "",
        };
    }

    hasErros(controlName: string, errorName: string): any {
        return this.form.controls[controlName].hasError(errorName);
    }

    goToPesquisar(): void {
        this.router.navigate([`cliente/pesquisar`]);
    }

}
