import { Settings } from './../../classes/Settings';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'settings-option',
  template: 'MOCK COMPONENT',
})
export class MockOptionComponent {
  @Input()
  type: 'toggle' | 'select' = 'select';

  @Input()
  settingsId: keyof Settings = 'id';

  @Input()
  label: string = '';

  @Input()
  selectionList: string[] = [];

  @Output()
  onChange: EventEmitter<{
    value: string;
    checked: boolean;
  }> = new EventEmitter();
}