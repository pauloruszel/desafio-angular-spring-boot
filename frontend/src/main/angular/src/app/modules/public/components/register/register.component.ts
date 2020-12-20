import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsuarioDto} from '../../../../shared/shared-models/dto/usuario-dto';
import {AuthService} from '../../../core/services/auth.service';
import {MensageriaService} from '../../../../shared/shared-services/mensageria-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private mensageriaService: MensageriaService,) {
  }

  ngOnInit() {
    this.iniciarFormulario();
  }

  iniciarFormulario() {
    this.form = this.formBuilder.group({
      nomeUsuario: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      senha: [null, [Validators.required, Validators.minLength(6)]],
      email: [null, [Validators.required, Validators.email]],
    });
  }

  montarUsuario(): UsuarioDto {
    return {
      nomeUsuario: this.form.get('nomeUsuario').value,
      email: this.form.get('email').value,
      senha: this.form.get('senha').value
    };
  }

  hasErros(controlName: string, errorName: string): any {
    return this.form.controls[controlName].hasError(errorName);
  }

  async create(usuario: UsuarioDto) {
    usuario = this.montarUsuario();
    this.authService.registrar(usuario).subscribe((data) => {
      console.log(data);
      this.mensageriaService.showMensagemSucesso('Registro salvo com sucesso!');
      this.goToLogin();
    }, (err) => {
      this.mensageriaService.showMensagemErro(err.error.mensagem);
    });
  }

  goToLogin(){
    this.router.navigate([`login`]);
  }

}
