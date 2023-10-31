import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Classroom } from '../models/classroom';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { Report } from '../models/report';
import { Student } from '../models/student';

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

  updateClassroom(classroom: Classroom, classroomId: number) : Observable<Classroom> {
    return this.http.put<Classroom>(this.url + "api/classes/" + classroomId, classroom,
     this.getHttpOptions()).pipe(
      catchError((err: any) =>{
        console.log(err);
        return throwError(
          () => new Error('TeacherService.updateClassroom(): error updating classroom: ' + err)
        )
      })
     )
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
    console.log('we are not getting here');
    return this.http
      .delete<User>(this.url + 'api/users', this.getHttpOptions())
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError(
            () =>
              new Error(
                'TeacherService.disable(): error disabling user: ' + err
              )
          );
        })
      );
  }

  //REPORT TO BEHAVIOR STUFF DOWN HERE
  addBehaviorToReport(reportId: number, behaviorId: number) {
    return this.http
      .post<Report>(
        this.url + 'api/reports/' + reportId + '/behaviors/' + behaviorId,
        null, this.getHttpOptions()
      )
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError(
            () =>
              new Error(
                'TeacherService.addBehaviorToReport(): error adding behavior: ' +
                  err
              )
          );
        })
      );
  }

  removeBehaviorFromReport(reportId: number, behaviorId: number) {
    return this.http
      .delete<Report>(
        this.url + 'api/reports/' + reportId + '/behaviors/' + behaviorId,
        this.getHttpOptions()
      )
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError(
            () =>
              new Error(
                'TeacherService.removeBehaviorFromReport(): error removing behavior: ' +
                  err
              )
          );
        })
      );
  }
  deleteReport(reportId: number) {
    return this.http
      .delete<Report>(
        this.url + 'api/reports/' + reportId,
        this.getHttpOptions()
      )
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError(
            () =>
              new Error(
                'TeacherService.deleteReport(): error removing report: ' +
                  err
              )
          );
        })
      );
  }

  editOtherUserDetails(studentId: number, userId: number, user: User) {
    return this.http.put<User>(this.url + 'api/users/' + userId + '/students/' + studentId,
    user, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () =>
            new Error(
              'TeacherService.editOtherUserDetails: error editing other user: ' +
                  err
            )
        )
      })
    )

  }

}
