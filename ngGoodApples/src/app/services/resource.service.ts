import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Resource } from '../models/resource';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  private url = environment.baseUrl + 'api/resources';


  constructor(private http: HttpClient) {}


  getHttpOptions() {
    let options = {
      headers: {
        // for now, I don't think we need any auth checks on services
        //Authorization: 'Basic ' + this.auth.getCredentials(),
        'X-Requested-With': 'XMLHttpRequest',
      },
    };
    return options;
  }

  index() : Observable<Resource[]>{
    return this.http.get<Resource[]>(this.url, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('ReportService.getAllStudentReports(): error retrieving reports: ' + err)
        );
      })
    )
  }


}
