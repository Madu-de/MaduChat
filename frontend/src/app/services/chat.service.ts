import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Chat } from '../classes/Chat';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  get(id: string): Observable<Chat> {
    return this.http.get<Chat>(`${this.auth.baseURL}/chat/${id}`, {
      headers: { Authorization: 'Bearer ' + this.auth.token }
    });
  }
}
