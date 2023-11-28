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

  addChat(memberids: string[]): Observable<Chat> {
    return this.http.post<Chat>(`${this.auth.baseURL}/chat`, {
      memberids
    }, {
      headers: { Authorization: 'Bearer ' + this.auth.token }
    });
  }

  editChat(id: string, name: string): Observable<Chat> {
    return this.http.put<Chat>(`${this.auth.baseURL}/chat/${id}`, {
      name
    }, {
      headers: { Authorization: 'Bearer ' + this.auth.token }
    });
  }

  removeMember(id: string, memberid: string) {
    return this.http.delete<Chat>(`${this.auth.baseURL}/chat/${id}/member/${memberid}`, {
      headers: { Authorization: 'Bearer ' + this.auth.token }
    })
  }
}
