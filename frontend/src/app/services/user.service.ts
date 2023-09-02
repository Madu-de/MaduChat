import { Settings } from './../classes/Settings';
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
    return this.http.get<User>(`${this.auth.baseURL}/users/me?chats=${chats}&friends=${friends}&settings=${settings}`, {
      headers: {
        ['Authorization']: 'Bearer ' + this.auth.token,
      }
    });
  }

  getUser(id: string, chats?: boolean, friends?: boolean, settings?: boolean) {
    return this.http.get<User>(`${this.auth.baseURL}/users/${id}?chats=${chats}&friends=${friends}&settings=${settings}`, {
      headers: {
        ['Authorization']: 'Bearer ' + this.auth.token,
      }
    });
  }

  getUsersLike(name: string, chats?: boolean, friends?: boolean, settings?: boolean) {
    return this.http.get<User[]>(`${this.auth.baseURL}/users?like=${name}&chats=${chats}&friends=${friends}&settings=${settings}`, {
      headers: {
        ['Authorization']: 'Bearer ' + this.auth.token,
      }
    });
  }

  addFriend(friendId: string) {
    return this.http.post<User>(`${this.auth.baseURL}/friends`, {
      friendId
    }, {
      headers: {
        ['Authorization']: 'Bearer ' + this.auth.token,
      },
    });
  }

  removeFriend(friendId: string) {
    return this.http.delete<User>(`${this.auth.baseURL}/friends`, {
      headers: {
        ['Authorization']: 'Bearer ' + this.auth.token,
      },
      body: {
        friendId
      }
    });
  }

  setSettings<K extends keyof Settings>(key: K, value: Settings[K]) {
    return this.http.post<Settings>(`${this.auth.baseURL}/users/me/settings/${key}`, {
      value,
    }, {
      headers: {
        ['Authorization']: 'Bearer ' + this.auth.token,
      },
    });
  }

  handleError(error: HttpErrorResponse, callback?: UserCallback) {
    if (callback) callback(false);
    return throwError(() => new Error(error.error.message));
  }
}

type UserCallback = (user: User | boolean) => void;
