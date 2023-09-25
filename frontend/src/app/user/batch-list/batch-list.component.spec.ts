import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchListComponent } from './batch-list.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LanguageService } from 'src/app/services/language.service';
import { MatTooltipModule } from '@angular/material/tooltip';

describe('BatchListComponent', () => {
  let component: BatchListComponent;
  let fixture: ComponentFixture<BatchListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BatchListComponent],
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
    fixture = TestBed.createComponent(BatchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
