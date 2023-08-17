import { UserService } from 'src/app/services/user.service';
import { Settings } from './../../classes/Settings';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/classes/User';

@Component({
  selector: 'settings-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss']
})
export class OptionComponent implements OnInit{
  @Input()
  type: 'toggle' | 'select' = 'select';

  @Input()
  settingsId: keyof Settings = 'id';

  @Input()
  label: string = '';

  @Input()
  selectionList: string[] = [];

  @Output()
  onSelectionChange: EventEmitter<string> = new EventEmitter<string>();

  user: User | undefined;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getMe(false, false, true).subscribe((user) => {
      this.user = user;
    });
  }
}