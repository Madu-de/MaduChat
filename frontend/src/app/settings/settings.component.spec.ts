import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsComponent } from './settings.component';
import { LanguageService } from '../services/language.service';
import { UserService } from '../services/user.service';

import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MockOptionComponent } from './option/mockoption.component';
import { of } from 'rxjs';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatListModule,
        MatSlideToggleModule,
        MatFormFieldModule,
        MatSelectModule,
      ],
      declarations: [
        SettingsComponent,
        MockOptionComponent
      ],
      providers: [
        { 
          provide: LanguageService, 
          useValue: {
            getValue: () => '',
            getLanguages: () => []
          },
        },
        {
          provide: UserService,
          useValue: {
            getMe: () => of({}),
          },
        },
      ],
    });
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
