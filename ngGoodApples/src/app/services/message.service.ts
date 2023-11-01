import { RegisterComponent } from './../components/register/register.component';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { Message } from '../models/message';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private url = environment.baseUrl + 'api/messages';

  public listOfMessages : Message[] = [];
  public listOfUnreadMessages : Message[] = [];
  
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

  index(): Observable<Message[]> {
    return this.http.get<Message[]>(this.url, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('MessageService.index(): error retrieving messages: ' + err)
        );
      })
    );
  }

  indexReplies(messageId : number) : Observable<Message[]> {
    return this.http.get<Message[]>(this.url + "/" + messageId + "/replies",
            this.getHttpOptions()).pipe(
              catchError((err: any) => {
                console.log(err);
                return throwError(
                  () => new Error('MessageService.replies(): error retrieving replies: ' + err)
                );
              })
    )
  }
  indexUnread() : Observable<Message[]> {
    return this.http.get<Message[]>(this.url + "/unread", this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('MessageService.create(): error creating message: ' + err)
        );
      })
    )
  }
  create(message: Message, recipientId: number): Observable<Message> {
    return this.http.post<Message>(this.url + "/" + recipientId , message, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('MessageService.create(): error creating message: ' + err)
        );
      })
    )
  }

  indexTeachers() : Observable<User[]> {
    return this.http.get<User[]>(environment.baseUrl + 'api/users/teachers', this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('MessageService.indexTeachers(): error gettin teachers: ' + err)
        );
      })
    )
  }

  indexParents() : Observable<User[]> {
    return this.http.get<User[]>(environment.baseUrl + 'api/users/parents', this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('MessageService.indexparents(): error gettin parents: ' + err)
        );
      })
    )
  }

  updateRead(message : Message) : Observable<Message> {
    return this.http.put<Message>(environment.baseUrl + "api/messages", message, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('MessageService.indexparents(): error gettin parents: ' + err)
        );
      })
    )
  }
  updateThreadRead(message : Message) : Observable<Message> {
    return this.http.put<Message>(environment.baseUrl + "api/messages/thread", message, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('MessageService.indexparents(): error gettin parents: ' + err)
        );
      })
    )
  }


}
