import { Component, Input } from '@angular/core';
import { User } from 'src/app/classes/User';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'settings-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent {
  @Input()
  loading: boolean = false;
  
  @Input()
  user: User | undefined;

  constructor(public languageService: LanguageService) {}
}
