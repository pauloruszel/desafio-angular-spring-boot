import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MensageriaService} from "../../../../../shared/shared-services/mensageria-service";
import {ClienteService} from "../../../../../shared/shared-services/cliente.service";
import {ConsultaCepService} from "../../../../../shared/shared-services/consulta-cep.service";
import {ClienteDto} from "../../../../../shared/shared-models/dto/cliente-dto";
import {removerMascara} from "../../../../../shared/shared-utils/retirar-mascara.util";
import {EmailDto} from "../../../../../shared/shared-models/dto/email-dto";
import {EnderecoDto} from "../../../../../shared/shared-models/dto/endereco-dto";
import {TelefoneDto} from "../../../../../shared/shared-models/dto/telefone-dto";
import {TipoTelefoneDto} from "../../../../../shared/shared-models/dto/tipo-telefone-dto";
import {TokenStorageService} from "../../../../core/services/token-storage.service";
import {TipoContatoService} from "../../../../../shared/shared-services/tipo-contato.service";
import {ErrorDto} from "../../../../../shared/shared-models/dto/error-dto";
import {EmailValidators} from "../../../../../shared/shared-validators/email-validators";
import {CepValidators} from "../../../../../shared/shared-validators/cep-validators";
import {CpfValidators} from "../../../../../shared/shared-validators/cpf-validators";
import {TelefoneCelularValidators} from "../../../../../shared/shared-validators/telefone-celular-validators";

@Component({
    selector: 'app-cadastrar',
    templateUrl: './cadastrar.component.html',
    styleUrls: ['./cadastrar.component.scss']
})
export class CadastrarComponent implements OnInit {

    form: FormGroup;
    tiposDeContatos: TipoTelefoneDto[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private clienteService: ClienteService,
        private consultaCepService: ConsultaCepService,
        private mensageriaService: MensageriaService,
        private tokenStorageService: TokenStorageService,
        private tipoContatoService: TipoContatoService) {

    }

    public isEmailValid = EmailValidators.isEmailValid();
    public isCepValid = CepValidators.isValidCep();
    public isCpfValid = CpfValidators.isValidCpf();
    public isTelefoneValid = TelefoneCelularValidators.isValidCellPhone();

    ngOnInit() {
        this.iniciarFormulario();
        this.tipoContatoService.getTiposContato().subscribe(rs => this.tiposDeContatos = rs)
    }

    iniciarFormulario() {
        this.form = this.formBuilder.group({
            nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
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
        });
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
            this.consultaCepService.getConsultaCEP(cep).subscribe((dados) => {
                this.populaDadosCep(dados);
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

    montarDadosCliente(): ClienteDto {
        return {
            id: null,
            nome: this.form.get('nome').value,
            cpf: removerMascara(this.form.get('cpf').value),
            endereco: this.montarEndereco(),
            email: this.montarEmail(),
            telefone: this.montarTelefone()
        };
    }

    montarEndereco(): EnderecoDto {
        return {
            cep: removerMascara(this.form.get('cep').value),
            logradouro: this.form.get('logradouro').value,
            bairro: this.form.get('bairro').value,
            cidade: this.form.get('cidade').value,
            uf: this.form.get('uf').value,
            complemento: this.form.get('complemento').value,
        };
    }

    async create(cliente: any) {
        cliente = this.montarDadosCliente();

        if (this.form.valid) {
            this.clienteService.salvar(cliente).subscribe(() => {
                this.mensageriaService.showMensagemSucesso('Salvo com Sucesso.')
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
            descricaoEmail: this.form.get('email').value,
        };
    }

    montarTelefone(): TelefoneDto {
        return {
            numeroTelefone: this.form.get('telefone').value,
            tipoTelefone: this.montarTipoTelefone(),
        };
    }

    montarTipoTelefone(): TipoTelefoneDto {
        return {
            id: this.form.get('tipoContato').value,
            descricaoTipoTelefone: null,
        };
    }

    hasErros(controlName: string, errorName: string): any {
        return this.form.controls[controlName].hasError(errorName);
    }

    goToPesquisar(): void {
        this.router.navigate([`cliente/pesquisar`]);
    }

}
