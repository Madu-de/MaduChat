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

  getMessages(id: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.auth.baseURL}/chat/${id}/messages`, {
      headers: { Authorization: 'Bearer ' + this.auth.token }
    });
  }
}
