import { Component, Input } from '@angular/core';

@Component({
  selector: 'settings-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent {
  @Input()
  label: string = '';
}
