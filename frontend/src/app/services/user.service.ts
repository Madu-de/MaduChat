import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../classes/User';
import { AuthService } from './auth.service';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  getMe(chats?: boolean, friends?: boolean, settings?: boolean) {
    return this.http.get<User>(`${this.auth.baseURL}/user/me?chats=${chats}&friends=${friends}&settings=${settings}`, {
      headers: {
        ['Authorization']: 'Bearer ' + this.auth.token,
      }
    })
  }

  handleError(error: HttpErrorResponse, callback?: UserCallback) {
    if (callback) callback(false);
    return throwError(() => new Error(error.error.message));
  }
}

type UserCallback = (user: User | boolean) => void;
