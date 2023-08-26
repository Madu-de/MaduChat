import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendRequestsComponent } from './friend-requests.component';
import { LanguageService } from 'src/app/services/language.service';
import { MatListModule } from '@angular/material/list';
import { MockUserListComponent } from '../user-list/mockuser-list.component';

describe('FriendRequestsComponent', () => {
  let component: FriendRequestsComponent;
  let fixture: ComponentFixture<FriendRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatListModule,
      ],
      declarations: [
        FriendRequestsComponent,
        MockUserListComponent
      ],
      providers: [
        {
          provide: LanguageService,
          useValue: {
            getValue: () => ''
          }
        }
      ]
    });
    fixture = TestBed.createComponent(FriendRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
