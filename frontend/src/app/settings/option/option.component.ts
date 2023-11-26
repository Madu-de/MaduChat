import { Language } from './../../services/languages/language.interface';
import { UserService } from 'src/app/services/user.service';
import { Settings } from './../../classes/Settings';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/classes/User';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'settings-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss']
})
export class OptionComponent {
  @Input()
  user: User | undefined;

  @Input()
  type: 'toggle' | 'select' = 'select';

  @Input()
  settingsId: keyof Settings = 'id';

  @Input()
  label: string = '';

  @Input()
  selectionList: string[] = [];

  @Input()
  indexSelect: boolean = false;

  @Output()
  onChange: EventEmitter<{
    value: string;
    checked: boolean;
  }> = new EventEmitter();

  constructor(private userService: UserService, public languageService: LanguageService) {}

  changeEvent(value: string | boolean) {
    this.userService.setSettings(this.settingsId, value).subscribe((settings) => {
      const event = this.type === 'select' ? 
      { checked: false, value: <string>value, } : 
      { checked: <boolean>value, value: '' };
      this.onChange.emit(event);
    });
  }

  getTranslationIfExists(value: string) {
    return this.languageService.getValue(<keyof Language>value) || value;
  }
}