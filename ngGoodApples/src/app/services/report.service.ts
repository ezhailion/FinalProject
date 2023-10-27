import { Report } from 'src/app/models/report';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Observable, catchError, throwError } from 'rxjs';

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

}
