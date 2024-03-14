import { Settings } from './../classes/Settings';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../classes/User';
import { AuthService } from './auth.service';
import { from, switchMap, throwError } from 'rxjs';
import { ImageService } from './image.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private meChanged: EventEmitter<void> = new EventEmitter();

  constructor(private http: HttpClient, private auth: AuthService, private imageService: ImageService) { }

  getMe(chats?: boolean, friends?: boolean, settings?: boolean, review?: boolean) {
    return this.http.get<User>(`${this.auth.baseURL}/users/me?chats=${chats}&friends=${friends}&settings=${settings}&review=${review}`, {
      headers: {
        ['Authorization']: 'Bearer ' + this.auth.token,
      }
    });
  }

  getUser(id: string, chats?: boolean, friends?: boolean, settings?: boolean, review?: boolean) {
    return this.http.get<User>(`${this.auth.baseURL}/users/${id}?chats=${chats}&friends=${friends}&settings=${settings}&review=${review}`, {
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

  private getUserProfilePictureAsBlob(id: string) {
    return this.http.get(`${this.auth.baseURL}/users/${id}/profilepicture`, {
      headers: {
        ['Authorization']: 'Bearer ' + this.auth.token,
      },
      responseType: 'blob',
    });
  }

  getUserProfilePicture(id: string) {
    return from(this.getUserProfilePictureAsBlob(id).pipe(
      switchMap((blob) => this.imageService.convertBlopToImage(blob)))
    );
  }

  setUserProfilePicture(file: File) {
    const formdata = new FormData();
    formdata.append('file', file);
    return from(this.http.put(`${this.auth.baseURL}/users/me/profilepicture`, formdata, {
      headers: {
        ['Authorization']: 'Bearer ' + this.auth.token,
      },
      responseType: 'blob',
    }).pipe(
      switchMap((blob) => this.imageService.convertBlopToImage(blob))
    ));
  }

  deleteUserProfilePicture() {
    return from(this.http.delete(`${this.auth.baseURL}/users/me/profilepicture`, {
      headers: {
        ['Authorization']: 'Bearer ' + this.auth.token,
      },
      responseType: 'blob',
    }).pipe(
      switchMap((blob) => this.imageService.convertBlopToImage(blob))
    ));
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
    return this.http.put<Settings>(`${this.auth.baseURL}/users/me/settings`, {
      [key]: value,
    }, {
      headers: {
        ['Authorization']: 'Bearer ' + this.auth.token,
      },
    });
  }

  emitMeChanged() {
    this.meChanged.emit();
  }

  getMeChangedEmitter() {
    return this.meChanged;
  }

  handleError(error: HttpErrorResponse, callback?: UserCallback) {
    if (callback) callback(false);
    return throwError(() => new Error(error.error.message));
  }
}

type UserCallback = (user: User | boolean) => void;
