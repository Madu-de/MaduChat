import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageComponent } from './message.component';
import { UserService } from 'src/app/services/user.service';
import { of } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { RouterTestingModule } from '@angular/router/testing';
import { MockModule } from 'ng-mocks';
import { UserModule } from 'src/app/user/user.module';

describe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatListModule,
        MatCardModule,
        RouterTestingModule,
        MockModule(UserModule)
      ],
      declarations: [
        MessageComponent,
      ],
      providers: []
    });
    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
