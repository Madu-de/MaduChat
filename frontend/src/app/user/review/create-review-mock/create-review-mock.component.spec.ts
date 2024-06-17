import { MockModule } from 'ng-mocks';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReviewMockComponent } from './create-review-mock.component';
import { LanguageService } from 'src/app/services/language.service';
import { UserService } from 'src/app/services/user.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

describe('CreateReviewMockComponent', () => {
  let component: CreateReviewMockComponent;
  let fixture: ComponentFixture<CreateReviewMockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MockModule(MatDialogModule),
        MockModule(MatFormFieldModule),
        MockModule(ReactiveFormsModule),
        MockModule(MatIconModule),
      ],
      declarations: [CreateReviewMockComponent],
      providers: [
        {
          provide: LanguageService,
          useValue: {
            getValue: () => '',
          }
        },
        {
          provide: UserService,
          useValue: {}
        },
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            targetId: '',
          }
        },
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateReviewMockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
