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

@Component({
    selector: 'app-editar',
    templateUrl: './editar.component.html',
    styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit {

    form: FormGroup;
    tiposDeContatos: TipoTelefoneDto[] = [];
    cliente: ClienteDto = null;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private clienteService: ClienteService,
        private consultaCepService: ConsultaCepService,
        private mensageriaService: MensageriaService,
        private tipoContatoService: TipoContatoService) {

    }

    ngOnInit() {
        this.iniciarFormulario();
        this.tipoContatoService.getTiposContato().subscribe(rs => this.tiposDeContatos = rs);
        this.getClientesEdicao();
    }

    getClientesEdicao() {
        this.route.params.subscribe((params: Params) => {
            this.clienteService.getClientesEditar(params.id).subscribe((res: ClienteDto) => {
                this.montarClienteDTO(res);
            }, error => {
                this.mensageriaService.showMensagemErro(error.mensagem);
            });
        });

    }

    recuperarDadosFormulario(response: ClienteDto) {
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
                tipoContato: null, // response.telefone.tipoTelefone.id,
                telefone: null, // response.telefone.numeroTelefone,
                email: null //response.email.descricaoEmail,
            });
    }


    montarClienteDTO(response: any) {
        if (response) {
            this.cliente = response;
            this.recuperarDadosFormulario(this.cliente);
        } else {
            this.mensageriaService.showMensagemErro("Cliente não encontrado(a)");
        }
    }

    iniciarFormulario() {
        this.form = this.formBuilder.group({
            nome: [{value: '', disabled: true}, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
            cpf: [{value: '', disabled: true}, [Validators.required]],
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
        this.form.patchValue(
            {
                logradouro: dados.logradouro,
                bairro: dados.bairro,
                cidade: dados.localidade,
                uf: dados.uf,
                complemento: dados.complemento,
            });
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
        cliente = this.montarDadosClienteEdicao();

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
