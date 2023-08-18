import { Language } from './languages/language.interface';
import { Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LANGUAGES } from './languages/languages';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  lang: string = '';

  constructor(private route: ActivatedRoute, private userService: UserService) { 
    this.userService.getMe(false, false, true).subscribe(user => {
      this.lang = user.settings?.language || 'English';
    });
    if (this.lang) return;
    this.route.queryParams
      .subscribe(params => {
        this.lang = params['lang'] || this.lang || 'English';
      }
    );
  }

  getValue(key: keyof Language): string {
    const language = LANGUAGES[this.lang];
    return language[key];
  }

  setLanguage(key: string): void {
    this.lang = key;
  }

  getLanguages(): string[] {
    return Object.keys(LANGUAGES);
  }
}
