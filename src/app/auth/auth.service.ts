import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, switchMap, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../users/user';
import { UserAuth } from './UserAuth';

interface UserData {
  name?: string;
  lastname?: string;
  email: string;
  password: string;
  role: string;
}
interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
  expiresIn: string;
  registered?: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isUserAuthenticated = false;
  public currentUser: UserAuth;
  private _users = new BehaviorSubject<User[]>([]);
  private _user = new BehaviorSubject<UserAuth | null>(null);
  private userRole = 'user';
  private adminRole = 'admin';

  constructor(private http: HttpClient, private router: Router) {}

  get users() {
    return this._users.asObservable();
  }

  get isUserAuthenticated() {
    return this._user.asObservable().pipe(
      map((user) => {
        if (user) {
          return !!user.token; //vrsimo konverziju u boolean
        } else {
          return false;
        }
      })
    );
  }

  get userId() {
    return this._user.asObservable().pipe(
      map((user) => {
        if (user) {
          return user.id;
        } else {
          return null;
        }
      })
    );
  }

  logIn(user: UserData) {
    this._isUserAuthenticated = true;
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseApiKey}`,
        { email: user.email, password: user.password, returnSecureToken: true }
      )
      .pipe(
        tap((userData) => {
          const expirationTime = new Date(
            new Date().getTime() + +userData.expiresIn * 1000
          );
          const newUser = new UserAuth(
            userData.localId,
            userData.email,
            userData.idToken,
            expirationTime
          );
          this.currentUser = newUser;
          this._user.next(newUser);
        })
      );
  }

  register(user: UserData) {
    this._isUserAuthenticated = true;
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseApiKey}`,
        { email: user.email, password: user.password, returnSecureToken: true }
      )
      .pipe(
        tap((userData) => {
          const expirationTime = new Date(
            new Date().getTime() + +userData.expiresIn * 1000
          );
          const newUser = new UserAuth(
            userData.localId,
            userData.email,
            userData.idToken,
            expirationTime
          );
          this.currentUser = newUser;
          this._user.next(newUser);
        })
      );
  }

  logOut() {
    this._user.next(null);
  }

  get token() {
    return this._user.asObservable().pipe(
      map((user) => {
        if (user) {
          return user.token;
        } else {
          return null;
        }
      })
    );
  }

  addNewUser(user: UserData) {
    if (user.email === 'admin@admin.com') {
      this.addAdmin(user).subscribe((admin) => {
        console.log(admin);
      });
    } else {
      this.addUser(user).subscribe((res) => {
        console.log(res);
      });
    }
  }

  addAdmin(user: UserData) {
    let generatedId: string;
    let admin: User;

    return this.token.pipe(
      take(1),
      switchMap((token) => {
        admin = new User(
          null,
          user.name!,
          user.lastname!,
          user.email,
          this.adminRole
        );
        return this.http.post<{ name: string }>(
          `https://la-salsa-ritmos-default-rtdb.europe-west1.firebasedatabase.app/users.json?auth=${token}`,
          admin
        );
      }),
      take(1),
      switchMap((resData) => {
        generatedId = resData.name;
        return this.users;
      }),
      take(1),
      tap((users) => {
        admin.id = generatedId;
        this._users.next(users.concat(admin));
      })
    );
  }

  addUser(user: UserData) {
    let generatedId: string;
    let newUser: User;

    return this.token.pipe(
      take(1),
      switchMap((token) => {
        newUser = new User(
          null,
          user.name!,
          user.lastname!,
          user.email,
          this.userRole
        );
        return this.http.post<{ name: string }>(
          `https://la-salsa-ritmos-default-rtdb.europe-west1.firebasedatabase.app/users.json?auth=${token}`,
          newUser
        );
      }),
      take(1),
      switchMap((resData) => {
        generatedId = resData.name;
        return this.users;
      }),
      take(1),
      tap((users) => {
        newUser.id = generatedId;
        this._users.next(users.concat(newUser));
      })
    );
  }
}
