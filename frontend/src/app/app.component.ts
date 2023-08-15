import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  constructor(private auth: AuthService, private user: UserService) {}

  ngOnInit() {
    //this.auth.login('madu', 'Passwort!1');
    // this.user.getMe();
  }

  isLoggedIn() {
    return this.auth.token != '';
  }
}
