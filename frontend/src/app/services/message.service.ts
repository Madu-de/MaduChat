import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Message} from "../classes/Message";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient, private auth: AuthService) {
  }

  getMessages(id: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.auth.baseURL}/chat/${id}/messages`, {
      headers: { Authorization: 'Bearer ' + this.auth.token }
    });
  }

  editMessage(id: string, message: string): Observable<Message> {
    return this.http.put<Message>(`${this.auth.baseURL}/message/${id}`, { message }, {
      headers: { Authorization: 'Bearer ' + this.auth.token }
    });
  }
}
