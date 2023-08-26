import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import { NavigationService } from '../services/navigation.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCommonModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockListComponent } from './list/mocklist.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatCommonModule,
        MatSidenavModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule,
        MatDividerModule,
        MatCardModule,
        BrowserAnimationsModule
      ],
      declarations: [
        SidebarComponent,
        MockListComponent
      ],
      providers: [
        {
          provide: NavigationService,
          useValue: {
            setSidebar: () => {}
          },
        },
      ]
    });
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
