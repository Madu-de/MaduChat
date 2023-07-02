import { Language } from './languages/language.interface';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LANGUAGES } from './languages/languages';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  lang: string = '';

  constructor(private route: ActivatedRoute, private router: Router) { 
    this.route.queryParams
      .subscribe(params => {
        this.lang = params['lang'] || 'English';
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
