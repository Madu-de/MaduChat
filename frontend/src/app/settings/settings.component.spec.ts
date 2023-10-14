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
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';

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
        MatSelectModule,
        MatProgressBarModule,
        MatTabsModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule
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
