import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendUserComponent } from './friend-user.component';

describe('FriendUserComponent', () => {
  let component: FriendUserComponent;
  let fixture: ComponentFixture<FriendUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FriendUserComponent]
    });
    fixture = TestBed.createComponent(FriendUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
