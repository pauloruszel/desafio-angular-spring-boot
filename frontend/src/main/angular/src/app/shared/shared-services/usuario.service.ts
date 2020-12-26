import {Injectable} from '@angular/core';
import {TokenStorageService} from "../../modules/core/services/token-storage.service";


@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
    private roles: string[];
    isLoggedIn = false;
    showAdminBoard = false;
    showModeratorBoard = false;
    showUserBoard = false;
    username: string;

    constructor(private tokenStorageService: TokenStorageService) {
        this.isLoggedIn = !!this.tokenStorageService.getToken();

        if (this.isLoggedIn) {
            const user = this.tokenStorageService.getUser();
            this.roles = user.roles;

            this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
            this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
            this.showUserBoard = this.roles.includes('ROLE_USER');

        }
    }

    isAdmin(): boolean {
        return this.showAdminBoard;
    }

    isUser(): boolean {
        return this.showUserBoard;
    }

    isModerator(): boolean {
        return this.showModeratorBoard;
    }

    isLogado(): boolean {
        return this.isLoggedIn
    }

    getUserName(): string {
        return this.username;
    }

}
