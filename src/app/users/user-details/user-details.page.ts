import { Component, OnInit } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
})
export class UserDetailsPage implements OnInit {
  user!: User;

  constructor() {}

  ngOnInit() {
    this.user = {
      id: '1',
      name: 'Keka',
      lastname: 'Todorovic',
      email: 'keka.todor@gmail.com',
      role: 'admin',
    };
  }
}
