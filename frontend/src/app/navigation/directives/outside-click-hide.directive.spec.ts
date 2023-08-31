import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OutsideClickHideDirective } from './outside-click-hide.directive';
import { TestOutSideClickComponent } from './test.component';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('OutsideClickHideDirective', () => {
  let component: TestOutSideClickComponent;
  let fixture: ComponentFixture<TestOutSideClickComponent>;
  let debugElementDiv: DebugElement;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [ CommonModule ],
      declarations: [ TestOutSideClickComponent, OutsideClickHideDirective ]
    }).createComponent(TestOutSideClickComponent);
    component = fixture.componentInstance;
    debugElementDiv = fixture.debugElement.query(By.css('div'));
  });

  it('should doesn\'t emit on click', () => {
    debugElementDiv.triggerEventHandler('click');
    fixture.detectChanges();
    expect(component.show).toBeFalse();
  });
});
