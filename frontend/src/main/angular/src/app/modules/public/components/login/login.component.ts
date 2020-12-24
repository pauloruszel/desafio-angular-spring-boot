import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../core/services/auth.service';
import {MensageriaService} from '../../../../shared/shared-services/mensageria-service';
import {CredencialDto} from '../../../../shared/shared-models/dto/credencial-dto';
import {TokenStorageService} from '../../../core/services/token-storage.service';
import {ERole} from '../../../../shared/shared-models/enums/role.enum';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  roles: ERole[] = [];

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private mensageriaService: MensageriaService,
              private tokenStorageService: TokenStorageService) {
  }

  ngOnInit() {
    this.iniciarFormulario();
  }

  iniciarFormulario() {
    this.form = this.formBuilder.group({
      nomeUsuario: [null, [Validators.required]],
      senha: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  montarCredencial(): CredencialDto {
    return {
      usuario: this.form.get('nomeUsuario').value,
      senha: this.form.get('senha').value,
    };
  }

  hasErros(controlName: string, errorName: string): any {
    return this.form.controls[controlName].hasError(errorName);
  }

  async create(credential) {
    credential = this.montarCredencial();
    this.authService.logar(credential).subscribe((data) => {

      this.tokenStorageService.saveToken(data.token);
      this.tokenStorageService.saveUsuario(data);
      this.roles = data.roles;
      this.mensageriaService.showMensagemSucesso('Logado como: ' + this.roles);
      this.reloadPage();
    }, (err) => {
      this.mensageriaService.showMensagemErro(err.mensagem);
    });
  }

  reloadPage(): void {
    window.location.reload();
  }

  goToRegister() {
    this.router.navigate([`register`]);
  }

}
