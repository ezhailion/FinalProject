import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Classroom } from '../models/classroom';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  private url = environment.baseUrl;

  constructor(private auth: AuthService, private http: HttpClient) {}

  getHttpOptions() {
    let options = {
      headers: {
        Authorization: 'Basic ' + this.auth.getCredentials(),
        'X-Requested-With': 'XMLHttpRequest',
      },
    };
    return options;
  }
  update(user: User) {
    return this.http
      .put<User>(this.url + 'api/users', user, this.getHttpOptions())
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError(
            () =>
              new Error('TeacherService.update(): error updatein user: ' + err)
          );
        })
      );
  }
  disableSelf(user: User) {
    console.log("we are not getting here")
    return this.http.delete<User>(this.url + 'api/users', this.getHttpOptions())
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError(
            () =>
              new Error('TeacherService.disable(): error disabling user: ' + err)
          );
        })
      );
  }
}
