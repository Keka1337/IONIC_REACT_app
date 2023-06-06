import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { User } from '../user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
})
export class UserDetailsPage implements OnInit {
  user: User;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private korisniciService: UsersService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('userId')) {
        this.navCtrl.navigateBack('/users');
        return;
      }

      this.isLoading = true;

      this.korisniciService
        .getUser(paramMap.get('userId')!)
        .subscribe((user) => {
          this.user = user;
          this.isLoading = false;
        });
    });
  }
}
