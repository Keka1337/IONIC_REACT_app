import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, switchMap, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from './user';

interface UserData {
  name: string;
  lastname: string;
  email: string;
  role: string;
}
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private _users = new BehaviorSubject<User[]>([]);

  constructor(private http: HttpClient, private authService: AuthService) {}

  get users() {
    return this._users.asObservable();
  }

  getUsers() {
    return this.authService.token.pipe(
      take(1),
      switchMap((token) =>
        this.http.get<{ [key: string]: UserData }>(
          `https://la-salsa-ritmos-default-rtdb.europe-west1.firebasedatabase.app/users.json?auth=${token}`
        )
      ),
      map((userData: any) => {
        const users: User[] = [];
        for (const key in userData) {
          if (userData.hasOwnProperty(key) && userData[key].role === 'user') {
            users.push(
              new User(
                key,
                userData[key].name,
                userData[key].lastname,
                userData[key].email,
                userData[key].role
              )
            );
          }
        }
        return users;
      }),
      tap((users) => {
        this._users.next(users);
      })
    );
  }

  getUser(id: string) {
    return this.authService.token.pipe(
      take(1),
      switchMap((token) =>
        this.http.get<UserData>(
          `https://la-salsa-ritmos-default-rtdb.europe-west1.firebasedatabase.app/users/${id}.json?auth=${token}`
        )
      ),
      map(
        (resData: UserData) =>
          new User(
            id,
            resData.name,
            resData.lastname,
            resData.email,
            resData.role
          )
      )
    );
  }
}
