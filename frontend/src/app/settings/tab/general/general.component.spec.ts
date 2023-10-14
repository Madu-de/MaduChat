import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralComponent } from './general.component';
import { LanguageService } from 'src/app/services/language.service';
import { MockComponent } from 'ng-mocks';
import { TabComponent } from '../tab.component';
import { CategoryComponent } from '../category/category.component';
import { OptionComponent } from '../../option/option.component';

describe('GeneralComponent', () => {
  let component: GeneralComponent;
  let fixture: ComponentFixture<GeneralComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        GeneralComponent,
        MockComponent(TabComponent),
        MockComponent(CategoryComponent),
        MockComponent(OptionComponent)
      ],
      providers: [
        {
          provide: LanguageService,
          useValue: {
            getValue: () => '',
            getLanguages: () => []
          }
        }
      ]
    });
    fixture = TestBed.createComponent(GeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
