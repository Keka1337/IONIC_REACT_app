import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

interface UserData {
  name?: string;
  surname?: string;
  email: string;
  password: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isUserAuthenticated = false;

  constructor(private http: HttpClient, private router: Router) {}

  logIn(user: UserData) {
    this.isUserAuthenticated = true;
    this.router.navigateByUrl('/appointments');
  }
}
