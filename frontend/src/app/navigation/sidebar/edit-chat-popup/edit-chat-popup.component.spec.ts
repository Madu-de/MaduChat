import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditChatPopupComponent } from './edit-chat-popup.component';

describe('EditChatPopupComponent', () => {
  let component: EditChatPopupComponent;
  let fixture: ComponentFixture<EditChatPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditChatPopupComponent]
    });
    fixture = TestBed.createComponent(EditChatPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
