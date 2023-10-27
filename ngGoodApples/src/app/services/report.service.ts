import { Report } from 'src/app/models/report';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Observable, catchError, throwError } from 'rxjs';
import { Behavior } from '../models/behavior';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private url = environment.baseUrl + 'api/reports';
  private behaviorUrl = environment.baseUrl + 'api/behaviors';

  constructor(private http: HttpClient, private auth: AuthService) {}

  getHttpOptions() {
    let options = {
      headers: {
        Authorization: 'Basic ' + this.auth.getCredentials(),
        'X-Requested-With': 'XMLHttpRequest',
      },
    };
    return options;
  }

  getSingleReport(reportId: number): Observable<Report> {
    return this.http.get<Report>(`${this.url}/${reportId}`, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('ReportService.getSingleReport(): error retrieving a class: ' + err)
        );
      })
    );
  }


  getAllStudentReports(studentId: number): Observable<Report[]> {
    return this.http.get<Report[]>(this.url + '/students/' + studentId, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('ReportService.getAllStudentReports(): error retrieving reports: ' + err)
        );
      })
    );
  }

  create(report : Report, studentUserId : number | undefined) : Observable<Report> {
    return this.http.post<Report>(this.url + '/students/' + studentUserId, report, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('ReportService.create(): error creating reports: ' + err)
        );
      })
    )
  }

  indexBehaviors() : Observable<Behavior[]> {
    return this.http.get<Behavior[]>(this.behaviorUrl, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('ReportService.indexBehaviors(): error getting behaviors: ' + err)
        );
      })
    )
  }
}
