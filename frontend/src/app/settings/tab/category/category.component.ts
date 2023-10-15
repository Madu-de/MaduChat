import { Component, Input } from '@angular/core';

@Component({
  selector: 'settings-tab-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  @Input()
  label: string = '';
}
