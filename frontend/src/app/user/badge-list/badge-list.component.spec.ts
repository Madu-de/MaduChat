import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeListComponent } from './badge-list.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LanguageService } from 'src/app/services/language.service';
import { MatTooltipModule } from '@angular/material/tooltip';

describe('BadgeListComponent', () => {
  let component: BadgeListComponent;
  let fixture: ComponentFixture<BadgeListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BadgeListComponent],
      imports: [
        MatIconModule,
        MatToolbarModule,
        MatTooltipModule
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
    fixture = TestBed.createComponent(BadgeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
