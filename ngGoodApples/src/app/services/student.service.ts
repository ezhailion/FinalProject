import { Reflection } from 'src/app/models/reflection';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Student } from '../models/student';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class StudentService {
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

  indexByClass(classId : number): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.url}/${classId}/students`, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error("StudentService.index(): error retrieving students: " + err)
        )
      })
    )
  }
  showByClassId(classId: number, studentId: number) : Observable<Student> {
    return this.http.get<Student>(
      `${this.url}/${classId}/students/${studentId}`,
      this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error("StudentService.showByClassId(): error retrieving student: " + err)
        )
      })
    )
  }
  // will need to fix mapping
  create(reflection: Reflection) {
    return this.http.post<Reflection>(environment.baseUrl + "api/reflections", reflection, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('ReflectionService.create(): error creating reflection: ' + err)
        )
      })
    )
  }

  indexReflections(studentId: number): Observable<Reflection[]> {
    return this.http.get<Reflection[]>(environment.baseUrl + "api/reflections/students/" + studentId, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error("StudentService.indexReflections(): error retrieving reflections: " + err)
        )
      })
    )
  }

  getStudentForUser(): Observable<Student> {
    return this.http.get<Student>(environment.baseUrl + "api/users/students", this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error("StudentService.getStudent: error retrieving student: " + err)
        )
      })
    )
  }

  getStudentsByParent(): Observable<Student[]> {
    return this.http.get<Student[]>(environment.baseUrl + 'api/users/kids', this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error("StudentService.getStudentsByParent: error retrieving students: " + err)
        )
      })
    )
  }

    createStudent(user: User, classId: number) : Observable<Student> {
      return this.http.post<Student>(environment.baseUrl + "api/register/students/" + classId , user, this.getHttpOptions()).pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError(
            () => new Error('StudentService.createStudent(): error creating student: ' + err)
          );
        })
      )
    }

    getStudents() : Observable<Student[]> {
      return this.http.get<Student[]>(environment.baseUrl + "api/students",this.getHttpOptions()).pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError(
            () => new Error('StudentService.getStudents: error getting students: ' + err)
          )
        })
      )
    }
}
