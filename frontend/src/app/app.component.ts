import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  constructor(private auth: AuthService) {}

  ngOnInit() {
    //this.auth.login('madu', 'Passwort!1');
  }

  isLoggedIn() {
    return this.auth.token != '';
  }
}
