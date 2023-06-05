import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCrtl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}

  onRegister(form: NgForm) {
    this.loadingCrtl
      .create({ message: 'Registration in progress...' })
      .then((loadingEl) => {
        loadingEl.present();
        this.authService.register(form.value).subscribe(
          (resData) => {
            console.log('Successfully registered!');
            console.log(resData);
            this.authService.addNewUser(form.value);
            loadingEl.dismiss();
            if (this.authService.currentUser?.email === 'admin@admin.com') {
              this.router.navigateByUrl('/appointments');
            } else {
              this.router.navigateByUrl('/appointments');
            }
          },
          (errRes) => {
            console.log(errRes);
            loadingEl.dismiss();
            let message = 'An error has occured!';

            const code = errRes.error.error.message;
            if (code === 'EMAIL_EXISTS') {
              message = 'User with provided email already exists!';
            }

            this.alertCtrl
              .create({
                header: 'Error',
                message,
                buttons: ['Submit'],
              })
              .then((alert) => {
                alert.present();
              });
            form.reset();
          }
        );
      });
  }
}
