import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { CookieService } from './cookie.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public baseURL: string = environment.apiURL;
  get token(): string {
    const token = this.cookie.getCookie('access_token');
    return token || '';
  }
  set token(value: string) {
    this.cookie.setCookie('access_token', value, 30 * 60, '/');
  }

  constructor(private http: HttpClient, private cookie: CookieService) { }

  login(username: string, password: string, callback?: LoggedInCallback) {
    this.http.post<AuthResponse>(`${this.baseURL}/auth/login`, {
      username,
      password
    })
      .pipe(
        catchError((err: HttpErrorResponse) => this.handleError(err, callback))
      )
      .subscribe((res) => {
        this.token = res.access_token;
        if (callback) {
          callback(true);
        }
      });
  }

  register(email: string, name: string, username: string, password: string, language: string, callback: LoggedInCallback) {
    this.http.post<AuthResponse>(`${this.baseURL}/auth/register`, {
      username,
      password,
      name,
      email,
      settings: {
        language
      }
    })
      .pipe(
        catchError((err: HttpErrorResponse) => this.handleError(err, callback))
      )
      .subscribe(res => {
        this.token = res.access_token;
        if (callback) {
          callback(true);
        }
      });
  }

  logout() {
    this.token = '';
  }

  handleError(error: HttpErrorResponse, callback?: LoggedInCallback) {
    if (callback) callback(false, error);
    return throwError(() => new Error(error.error.message));
  }
}

interface AuthResponse {
  access_token: string;
}

type LoggedInCallback = (loggedIn: boolean, error?: HttpErrorResponse) => void