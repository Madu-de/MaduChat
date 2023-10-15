import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { LanguageService } from 'src/app/services/language.service';
import { MockComponent } from 'ng-mocks';
import { TabComponent } from '../tab.component';
import { CategoryComponent } from '../category/category.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProfileComponent,
        MockComponent(TabComponent),
        MockComponent(CategoryComponent),
        MockComponent(ProfileComponent)
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
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
