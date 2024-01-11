import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMessagePopupComponent } from './edit-message-popup.component';

describe('EditMessagePopupComponent', () => {
  let component: EditMessagePopupComponent;
  let fixture: ComponentFixture<EditMessagePopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditMessagePopupComponent]
    });
    fixture = TestBed.createComponent(EditMessagePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
