import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}

  onLogIn(form: NgForm) {
    this.isLoading = true;
    if (form.valid) {
      this.authService.logIn(form.value).subscribe(
        (resData) => {
          console.log('Successfully logged in!');
          console.log(resData);
          this.isLoading = false;

          if (this.authService.currentUser?.email === 'admin@admin.com') {
            this.router.navigateByUrl('/appointments');
          } else {
            this.router.navigateByUrl('/about-us');
          }
        },
        (errRes) => {
          console.log(errRes);
          this.isLoading = false;
          let message = 'Invalid email or password!';
          this.alertCtrl
            .create({
              header: 'Authentication failed',
              message,
              buttons: ['Confirm'],
            })
            .then((alert) => {
              alert.present();
            });
          form.reset();
        }
      );
    }
  }
}
