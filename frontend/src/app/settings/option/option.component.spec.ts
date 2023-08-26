import { of } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionComponent } from './option.component';
import { UserService } from 'src/app/services/user.service';

import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

describe('OptionComponent', () => {
  let component: OptionComponent;
  let fixture: ComponentFixture<OptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatListModule,
        MatSlideToggleModule,
        MatFormFieldModule,
        MatSelectModule,
      ],
      declarations: [OptionComponent],
      providers: [
        {
          provide: UserService,
          useValue: {
            getMe: () => of({})
          }
        }
      ]
    });
    fixture = TestBed.createComponent(OptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
