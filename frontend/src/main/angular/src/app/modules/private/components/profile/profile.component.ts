import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../../core/services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  currentUser: any;
  private token1: any;
  private token2: any;

  constructor(private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.currentUser = this.tokenStorageService.getUser();
    this.getPartToken();
  }


  private getPartToken() {
    if (this.currentUser) {
      this.token1 = this.currentUser.token.substring(0, 20);
      this.token2 = this.currentUser.token.substr(this.currentUser.token.length - 20);
    }

  }

}
