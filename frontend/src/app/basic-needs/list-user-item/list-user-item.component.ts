import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/classes/User';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'list-user-item',
  templateUrl: './list-user-item.component.html',
  styleUrls: ['./list-user-item.component.scss']
})
export class ListUserItem implements OnInit {
  @Input()
  user: User | undefined;

  @Input()
  clientUser: User | undefined;

  @Input()
  isAdded: boolean = false;

  @Input()
  autoIconToggle: boolean = false;

  @Output()
  onToggle: EventEmitter<boolean> = new EventEmitter();

  userImage: string = '';

  constructor(private userService: UserService) { }

  ngOnInit() {
    if (!this.user) return;
    this.userService.getUserProfilePicture(this.user.id).subscribe((image) => {
      this.userImage = image;
    });
  }

  toggleAdded() {
    this.onToggle.emit(this.isAdded);
    if (this.autoIconToggle) this.isAdded = !this.isAdded;
  }
}
