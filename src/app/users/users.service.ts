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
      map((korisnikData: any) => {
        const korisnici: User[] = [];
        for (const key in korisnikData) {
          if (
            korisnikData.hasOwnProperty(key) &&
            korisnikData[key].role === 'user'
          ) {
            korisnici.push(
              new User(
                key,
                korisnikData[key].name,
                korisnikData[key].lastname,
                korisnikData[key].email,
                korisnikData[key].role
              )
            );
          }
        }
        return korisnici;
      }),
      tap((korisnici) => {
        this._users.next(korisnici);
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
