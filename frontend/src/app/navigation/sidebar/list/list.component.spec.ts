import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { LanguageService } from 'src/app/services/language.service';

import { CommonModule } from '@angular/common';
import { MatCommonModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from 'src/app/services/user.service';
import { ChatService } from 'src/app/services/chat.service';
import { of } from 'rxjs';
import { MatDialogModule } from '@angular/material/dialog';
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListComponent],
      providers: [
        {
          provide: LanguageService,
          useValue: {
            getValue: () => ''
          }
        },
        {
          provide: UserService,
          useValue: {
            getMe: () => of({
              chats: []
            }),
            getMeChangedEmitter: () => of({

            })
          }
        },
        {
          provide: ChatService,
          useValue: {}
        }
      ],
      imports: [
        MatCommonModule,
        MatSidenavModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule,
        MatDividerModule,
        MatCardModule,
        RouterTestingModule,
        MatDialogModule,
        MatSnackBarModule,
      ],
    });
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
