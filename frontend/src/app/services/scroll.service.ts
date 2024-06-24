import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  @Output()
  onScroll = new EventEmitter();

  constructor() { }
}
