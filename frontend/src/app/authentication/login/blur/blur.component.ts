import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-blur',
  templateUrl: './blur.component.html',
  styleUrls: ['./blur.component.scss']
})
export class BlurComponent {
  @Input() show: boolean = true;
}
