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

  onRegister(form: NgForm) {}
}
