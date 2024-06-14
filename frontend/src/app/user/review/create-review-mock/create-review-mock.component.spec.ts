import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReviewMockComponent } from './create-review-mock.component';

describe('CreateReviewMockComponent', () => {
  let component: CreateReviewMockComponent;
  let fixture: ComponentFixture<CreateReviewMockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateReviewMockComponent]
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
