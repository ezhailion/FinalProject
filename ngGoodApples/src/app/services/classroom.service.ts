import { Classroom } from './../models/classroom';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {
  private url = environment.baseUrl + 'api/classes';
  constructor(
private http: HttpClient,
private auth: AuthService
  ) { }

  getHttpOptions() {
    let options = {
      headers: {
        Authorization: 'Basic ' + this.auth.getCredentials(),
        'X-Requested-With': 'XMLHttpRequest',
      },
    };
    return options;
  }

  index(): Observable<Classroom[]> {
    return this.http.get<Classroom[]>(this.url, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('ClassroomService.index(): error retrieving classes: ' + err)
        );
      })
    );
  }

  // untested
  show(classId : number): Observable<Classroom> {
    return this.http.get<Classroom>(`${this.url}/${classId}`, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('ClassroomService.show(): error retrieving a class: ' + err)
        );
      })
    );
  }

  // tested
  create(classroom: Classroom): Observable<Classroom> {
    return this.http.post<Classroom>(this.url, classroom, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('ClassroomService.create(): error creating classs: ' + err)
        );
      })
    )
  }


  //UNTESTED
  disable(id : number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('ClassroomService.create(): error creating classs: ' + err)
        );
      })
    )

  }
}
