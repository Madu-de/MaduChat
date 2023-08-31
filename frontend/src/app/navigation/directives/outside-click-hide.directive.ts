import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appOutsideClickHide]'
})
export class OutsideClickHideDirective {
  @Output()
  appOutsideClickHide: EventEmitter<void> = new EventEmitter<void>();

  constructor(private el: ElementRef) { }

  @HostListener('document:click', ['$event.target', '$event.target']) onClick(element: HTMLElement, target: HTMLElement) {
    let nodes = [];
    while (element.parentNode) {
      nodes.push(element);
      element = <HTMLElement>element.parentNode;
    }
    if (nodes.some(node => node.classList.contains('appOutsideClickHide-ignore'))) return;
    if (!this.el.nativeElement.contains(target)) this.appOutsideClickHide.emit();
  }

}
