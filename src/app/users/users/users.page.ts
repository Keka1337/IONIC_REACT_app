import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit, OnDestroy {
  users: User[];
  private usersSub: Subscription;

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.usersSub = this.usersService.users.subscribe((users) => {
      console.log(users);
      this.users = users;
    });
  }

  ionViewWillEnter() {
    this.usersService.getUsers().subscribe((users) => {});
  }

  ngOnDestroy(): void {
    if (this.usersSub) {
      this.usersSub.unsubscribe();
    }
  }
}
