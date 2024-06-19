import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrl: './stars.component.scss'
})
export class StarsComponent {
  @Input()
  rating: number = 0;

  counter(i: number) {
    return new Array(i);
  }
}
