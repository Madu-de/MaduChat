import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public hideLogin: boolean = true;
  public hideRegister: boolean = true;
  public hideRegisterConfirm: boolean = true;
  public type: string = 'login';
  public error: string = '';
  // We need this getter because of #138. subscriptSizing="dynamic" destroys everything...
  get addPasswordBr(): boolean {
    const errors = this.registerForm.controls.password.errors;
    if (!this.registerForm.controls.password.touched) return true;
    if (!errors) return true;
    return Object.keys(errors).length < 1;
  }

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

  constructor(private authService: AuthService, public languageService: LanguageService, private router: Router) {}

  ngOnInit(): void {
    this.router.navigate(['/']);
  }

  login() {
    if (!this.loginForm.value.username || !this.loginForm.value.password) return;
    this.loading = true;
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password)
    .pipe(
      catchError((error) => {
        this.loading = false;
        if (error.status === 401) {
          this.error = this.languageService.getValue('passwordorusernamewrongErr');
        } else {
          this.error = this.languageService.getValue('serverIsNotReachable');
        }
        return throwError(() => new Error(error.message));
      })
    )
    .subscribe((token) => {
      this.loading = false;
      this.authService.token = token;
    });
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
        this.authService.register(
          form.email,
          form.name, 
          form.username, 
          form.password, 
          this.languageService.lang
        ).pipe(
          catchError((error) => {
            this.loading = false;
            if (error.status === 400) {
              this.error = this.languageService.getValue('userAlreadyExistsErr');
            } else {
              this.error = this.languageService.getValue('serverIsNotReachable');
            }
            if (error['message'].some((message: string) => message == 'email must be an email')) {
              this.error = this.languageService.getValue('emailIsNotValid');
            }
            return throwError(() => new Error(error.message));
          })
        ).subscribe((token) => {
          this.loading = false;
          this.authService.token = token;
        });
    }
  }
}
