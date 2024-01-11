import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Chat } from '../classes/Chat';
import { Observable } from 'rxjs';
import { Message } from '../classes/Message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private http: HttpClient, private auth: AuthService) { }

  get(id: string, members?: boolean): Observable<Chat> {
    return this.http.get<Chat>(`${this.auth.baseURL}/chat/${id}?members=${members}`, {
      headers: { Authorization: 'Bearer ' + this.auth.token }
    });
  }

  addChat(memberids: string[]): Observable<Chat> {
    return this.http.post<Chat>(`${this.auth.baseURL}/chat`, {
      memberids
    }, {
      headers: { Authorization: 'Bearer ' + this.auth.token }
    });
  }

  editChat(id: string, chat: Chat): Observable<Chat> {
    return this.http.put<Chat>(`${this.auth.baseURL}/chat/${id}`, {
      chat
    }, {
      headers: { Authorization: 'Bearer ' + this.auth.token }
    });
  }
}
