import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Classroom } from '../models/classroom';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private url = environment.baseUrl + 'api/teachers';

  constructor(
    private auth: AuthService,
    private http: HttpClient
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



}
