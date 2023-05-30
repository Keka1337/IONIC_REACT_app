import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  users!: User[];

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.users = [
      {
        id: '1',
        name: 'Keka',
        lastname: 'Todorovic',
        email: 'keka.todor@gmail.com',
        role: 'admin',
      },
    ];
  }
}
