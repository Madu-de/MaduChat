import { Component } from "@angular/core";

@Component({
  template: `
    <div (appOutsideClickHide)="toggleShow()"></div>
  `,
})
export class TestOutSideClickComponent {
  show = false;

  toggleShow() {
    this.show = !this.show;
  }
}