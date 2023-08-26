import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsListComponent } from './friends-list.component';
import { MockUserListComponent } from '../user-list/mockuser-list.component';
import { LanguageService } from 'src/app/services/language.service';

describe('FriendsListComponent', () => {
  let component: FriendsListComponent;
  let fixture: ComponentFixture<FriendsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        FriendsListComponent,
        MockUserListComponent,
      ],
    });
    fixture = TestBed.createComponent(FriendsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
