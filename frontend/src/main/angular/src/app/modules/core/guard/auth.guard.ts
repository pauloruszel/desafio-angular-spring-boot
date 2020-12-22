import {Injectable} from '@angular/core';
import {CanActivate, CanActivateChild, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {TokenStorageService} from "../services/token-storage.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {


    constructor(
        protected tokenStorageService: TokenStorageService) {
    }

    isAccessAllowed(): Promise<boolean> {
        return new Promise(async (resolve) => {
            if (!!this.tokenStorageService.getToken()) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    }

    canActivate(): Observable<boolean | UrlTree> | Promise<boolean
        | UrlTree> | boolean | UrlTree {
        return this.isAccessAllowed();
    }

    canActivateChild(): Observable<boolean | UrlTree> | Promise<boolean
        | UrlTree> | boolean | UrlTree {
        return this.isAccessAllowed();
    }

}
