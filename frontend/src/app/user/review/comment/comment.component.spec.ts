import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentComponent } from './comment.component';
import { MockComponent, MockModule } from 'ng-mocks';
import { MatCardModule } from '@angular/material/card';
import { StarsComponent } from './stars/stars.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MockModule(MatCardModule),
        RouterTestingModule,
      ],
      declarations: [
        CommentComponent,
        MockComponent(StarsComponent),
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
