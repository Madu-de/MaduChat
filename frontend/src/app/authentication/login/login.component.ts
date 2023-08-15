import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public hideLogin: boolean = true;
  public hideRegister: boolean = true;
  public hideRegisterConfirm: boolean = true;
  public type: string = 'login';
  public error: string = '';

  public loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  public registerForm = new FormGroup({
    email: new FormControl('', [Validators.email]),
    username: new FormControl(''),
    name: new FormControl('', [
      Validators.minLength(4),
      Validators.maxLength(20),
    ]),
    password: new FormControl('', [
      Validators.pattern(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/), 
      Validators.minLength(8)
    ]),
    passwordConfirm: new FormControl(''),
  });

  public loading: boolean = false;

  constructor(private authService: AuthService, public languageService: LanguageService) {}

  login() {
    if (this.loginForm.value.username && this.loginForm.value.password) {
      this.loading = true;
      this.authService.login(this.loginForm.value.username, this.loginForm.value.password, (result: boolean) => {
        this.loading = false;
        if (result) return;
        this.error = this.languageService.getValue('passwordorusernamewrongErr');
      });
    }
  }

  register() {
    const form = this.registerForm.value;
    if (form.email && 
      form.username && 
      form.password && 
      form.name && 
      form.passwordConfirm) {
        if (form.password != form.passwordConfirm) {
          this.error = this.languageService.getValue('passwordConfirmSameErr');
          return;
        } 
        this.loading = true;
        this.authService.register(form.email,
          form.name, 
          form.username, 
          form.password, (result) => {
            this.loading = false;
            if (result) return;
            this.error = this.languageService.getValue('userAlreadyExistsErr');
          });
    }
  }
}
