import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseUsersPopupComponent } from './choose-users-popup.component';

describe('ChooseUsersPopupComponent', () => {
  let component: ChooseUsersPopupComponent;
  let fixture: ComponentFixture<ChooseUsersPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChooseUsersPopupComponent]
    });
    fixture = TestBed.createComponent(ChooseUsersPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
