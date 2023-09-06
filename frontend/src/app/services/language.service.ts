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
  languageMap: Map<string, string> = new Map<string, string>([
    ['en', 'English'],
    ['de', 'Deutsch'],
    ['fr', 'Français'],
    ['es', 'Español']
  ]);

  constructor(private route: ActivatedRoute, private userService: UserService) { 
    this.userService.getMe(false, false, true).subscribe(user => {
      this.lang = user.settings?.language || this.getNavigatorLanguage();
    });
    if (this.lang) return;
    this.route.queryParams
      .subscribe(params => {
        this.lang = params['lang'] || this.lang || this.getNavigatorLanguage();
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

  private getNavigatorLanguage(): string {
    let returnLanguage = 'English';
    navigator.languages.every(language => {
      if ([...this.languageMap.keys()].some(languageKey => language === languageKey)) {
        returnLanguage = <string>this.languageMap.get(language); 
        return false;
      }
      return true;
    });
    
    return returnLanguage;
  }
}
