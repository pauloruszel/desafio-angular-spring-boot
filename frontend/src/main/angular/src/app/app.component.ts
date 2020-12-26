import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from './modules/core/services/token-storage.service';
import {UsuarioService} from "./shared/shared-services/usuario.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  showUserBoard = false;
  username: string;
  currentUser: any;

  constructor(private tokenStorageService: TokenStorageService,
              private usuarioService: UsuarioService) { }

  ngOnInit(): void {
      this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
        this.currentUser = this.tokenStorageService.getUser()
        const user = this.tokenStorageService.getUser();
        this.roles = user.roles;

        this.showAdminBoard = this.usuarioService.isAdmin();
        this.showModeratorBoard = this.usuarioService.isModerator();
        this.showUserBoard = this.usuarioService.isUser();

      this.username = this.usuarioService.getUserName();
    }
  }

  logout(): void {
    this.tokenStorageService.logout();
    window.location.reload();
  }
}
