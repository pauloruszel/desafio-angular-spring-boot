import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {TipoTelefoneDto} from "../../../../../shared/shared-models/dto/tipo-telefone-dto";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ClienteService} from "../../../../../shared/shared-services/cliente.service";
import {ConsultaCepService} from "../../../../../shared/shared-services/consulta-cep.service";
import {MensageriaService} from "../../../../../shared/shared-services/mensageria-service";
import {TipoContatoService} from "../../../../../shared/shared-services/tipo-contato.service";
import {ClienteListaDto} from "../../../../../shared/shared-models/dto/cliente-lista-dto";

@Component({
    selector: 'app-visualizar',
    templateUrl: './visualizar.component.html',
    styleUrls: ['./visualizar.component.scss']
})
export class VisualizarComponent implements OnInit {

    form: FormGroup;
    tiposDeContatos: TipoTelefoneDto[] = [];
    cliente: ClienteListaDto = null;
    tipoContatoSelecionado: number;

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
        this.getClientesVisualizacao();
    }

    getClientesVisualizacao() {
        this.route.params.subscribe((params: Params) => {
            this.clienteService.getClientesEditar(params.id).subscribe((res: ClienteListaDto) => {
                this.montarClienteDTO(res);
            }, (error) => {
                console.log(error);
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
                telefone:  response.telefones[0].numeroTelefone,
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
            nome: [{value: '', disabled: true}],
            cpf: [{value: '', disabled: true}],
            cep: [{value: '', disabled: true}],
            logradouro: [{value: '', disabled: true}],
            bairro: [{value: '', disabled: true}],
            cidade: [{value: '', disabled: true}],
            uf: [{value: '', disabled: true}],
            complemento: [{value: '', disabled: true}],
            tipoContato: [{value: '', disabled: true}],
            telefone: [{value: '', disabled: true}],
            email: [{value: '', disabled: true}],
        })
    }

    goToPesquisar(): void {
        this.router.navigate([`cliente/pesquisar`]);
    }

}
