import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewComponent } from './review.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LanguageService } from 'src/app/services/language.service';
import { UserService } from 'src/app/services/user.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { MockModule } from 'ng-mocks';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ScrollService } from 'src/app/services/scroll.service';
import { ReviewService } from 'src/app/services/review.service';
import { of } from 'rxjs';

describe('ReviewComponent', () => {
  let component: ReviewComponent;
  let fixture: ComponentFixture<ReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MockModule(MatCardModule),
        MockModule(MatGridListModule),
        MockModule(MatProgressBarModule),
      ],
      declarations: [ReviewComponent],
      providers: [
        { 
          provide: LanguageService, 
          useValue: {
            getValue: () => ''
          }
        },
        {
          provide: UserService,
          useValue: {}
        },
        {
          provide: MatDialog,
          useValue: {}
        },
        {
          provide: SnackbarService,
          useValue: {}
        },
        {
          provide: ScrollService,
          useValue: {
            onScroll: of(),
          }
        },
        {
          provide: ReviewService,
          useValue: {}
        }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
