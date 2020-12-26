import {Injectable} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";


@Injectable({
    providedIn: 'root'
})
export class PreviousRouteService {
    private prev: string;
    private curr: string;
    private currentUrl: string;

    constructor(private router: Router) {
        this.currentUrl = this.router.url;
        router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.prev = this.curr;
                this.curr = event.url;
            };
        });
    }

    public getPreviousUrl() {
        return this.prev;
    }

}
