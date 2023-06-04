import { Injectable } from '@angular/core';

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
  private _isUserAuthenticated = false;

  constructor() {}

  logIn(user: UserData) {
    this._isUserAuthenticated = true;
  }
}
