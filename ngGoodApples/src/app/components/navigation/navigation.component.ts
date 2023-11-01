import { Student } from './../../models/student';
import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'src/app/models/message';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent{
  isCollapsed: boolean = false;
  display : boolean = false;

  loggedInUser : User = new User();

  unseenMessages : Message[] = [];

  constructor(
    public auth: AuthService,
    private router: Router,
    public messageService: MessageService
    ) {}

  ngOnInit() {
    this.auth.getLoggedInUser().subscribe({
      next: (user) => {
        this.loggedInUser = user;
        this.getUnreadMessages();
      },
      error: (oops) => {
        console.error(
          'NavComponent.getLoggedInUser() failed getting logged in user'
        );
        console.error(oops);
      },
    });

  }



  isLoggedIn() {
    return this.auth.checkLogin();
  }


  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/home');
  }

  canSeeMail() : boolean {
    let leRole = this.auth.loginUser.role;
    if(!leRole){
      leRole = this.loggedInUser.role;
    }
    return leRole === 'teacher' || leRole === 'parent'
  }

  getUnreadMessages() {
    this.messageService.indexUnread().subscribe({
      next: msgs => {
        this.unseenMessages = msgs;
        this.messageService.listOfMessages = msgs;
      },
      error: err => console.log("error loading messages" + err)
    })
  }

  hasUnseenMessages() : boolean {
    return this.unseenMessages.length > 0;
  }
}
