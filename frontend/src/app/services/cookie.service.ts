import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor() { }

  public setCookie(name: string, value: string, expires?: Date | number, path?: string) {
    let cookie = `${name}=${value}`;
    if (expires && typeof expires != 'number') cookie += `;expires=${expires}`;
    if (expires && typeof expires == 'number') cookie += `;max-age=${expires}`;
    if (path) cookie += `;path=${path}`;
    document.cookie = cookie;
    return this.getCookie(cookie);
  }

  public getCookie(name: string) {
    return this.getCookieMap().get(name);
  }

  private getCookieMap() {
    let cookieMap: Map<string, string> = new Map();
    const cookies = document.cookie.split('; ');
    cookies.forEach(cookie => {
      const keyValuePair = cookie.split('=');
      const [key, value] = [keyValuePair[0], keyValuePair[1]];
      cookieMap.set(key, value);
    });
    return cookieMap;
  }
}
