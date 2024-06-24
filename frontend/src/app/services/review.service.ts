import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Review } from '../classes/Review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  getRecivedReviews(userid: string, offset: number) {
    return this.http.get<Review[]>(`${this.auth.baseURL}/review/recieved/${userid}?offset=${offset}`, {
      headers: {
        ['Authorization']: 'Bearer '+ this.auth.token,
      },
    });
  }

  getWrittenReviews(userid: string, offset: number) {
    return this.http.get<Review[]>(`${this.auth.baseURL}/review/written/${userid}?offset=${offset}`, {
      headers: {
        ['Authorization']: 'Bearer '+ this.auth.token,
      },
    });
  }
}
