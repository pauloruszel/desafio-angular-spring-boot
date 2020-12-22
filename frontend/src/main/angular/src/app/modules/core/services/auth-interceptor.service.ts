import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenStorageService} from './token-storage.service';

const TOKEN_HEADER_KEY = 'Authorization';
const VIACEP_URL = 'http://viacep.com.br/ws/';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private tokenStorageService: TokenStorageService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authRequisicao = req;
        const token = this.tokenStorageService.getToken();
        if (!req.url.includes(VIACEP_URL) && token != null) {
            authRequisicao = req.clone({headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token)})
        }
        return next.handle(authRequisicao);
    }
}

export const authInterceptorProviders = [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
];
