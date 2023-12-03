import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, switchMap } from 'rxjs';
import { CookieService } from './cookie.service';
import { environment } from 'src/environments/environment';
import { WebsocketConnection } from '../classes/WebsocketConnection';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public baseURL: string = environment.apiURL;

  get token(): string {
    const token = this.cookie.getCookie('access_token');
    if (!this.websocket) this.websocket = new WebsocketConnection(token);
    return token || '';
  }

  set token(value: string) {
    this.websocket?.disconnect();
    if (value != '') this.websocket = new WebsocketConnection(value);
    this.cookie.setCookie('access_token', value, 30 * 60, '/');
  }

  public websocket: WebsocketConnection | undefined;

  constructor(private http: HttpClient, private cookie: CookieService) { }

  login(username: string, password: string) {
    return from(this.http.post<AuthResponse>(`${this.baseURL}/auth/login`, {
      username,
      password
    }).pipe(
      switchMap(this.returnAccessTokenObservable)
    ));
  }

  register(email: string, name: string, username: string, password: string, language: string) {
    return from(this.http.post<AuthResponse>(`${this.baseURL}/auth/register`, {
      username,
      password,
      name,
      email,
      settings: {
        language
      }
    }).pipe(
      switchMap(this.returnAccessTokenObservable))
    );
  }

  logout() {
    this.token = '';
  }

  private returnAccessTokenObservable(response: AuthResponse) {
    return new Observable<string>((observer) => {
      observer.next(response.access_token);
      observer.complete();
    });
  }
}

interface AuthResponse {
  access_token: string;
}