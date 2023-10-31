import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Message } from 'src/app/models/message';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {

  newMessage : Message = new Message();

  messages : Message [] = [];
  loggedInUser : User = new User();

  teacherContacts : User[] = [];

  constructor(
    private auth : AuthService,
    private router : Router,
    private messageService : MessageService,
  ){}

  ngOnInit() {
    if (!this.auth.checkLogin()) {
      this.router.navigateByUrl('mustBeLoggedIn');
    }
    this.auth.getLoggedInUser().subscribe({
      next: (user) => {
        this.loggedInUser = user;

        console.log("USER")
        console.log(user)
      },
      error: (oops) => {
        console.error(
          'ParentComponent.getLoggedInUser() failed getting logged in user'
        );
        console.error(oops);
      },
    });

    this.loadAllMessages();
    this.loadAllTeacherContacts();
  }

  loadAllMessages() {
    this.messageService.index().subscribe({
      next: (messages) => {
        this.messages = messages;

        console.log("MESSAGES")
        console.log(messages)
      },
      error: (oops) => {
        'ParentComponent.loadAllMessages() failed getting messages' + oops
      }
    })
  }

  createNewMessage(message: Message) {
    console.log("MESSAGE OBJECT ******")
    console.log(message)

    let recipientId = message.recipient.id;
    this.messageService.create(message, recipientId).subscribe({
      next: (createdMessage) => {
        this.loadAllMessages();
      },
      error: (oops) => {
        'Messagecomponent.createNewMessage() failed creating message' + oops
      }
    })
  }

  loadAllTeacherContacts() {
    this.messageService.indexTeachers().subscribe({
      next: (teachers) => {this.teacherContacts = teachers; console.log(teachers)},
      error: err => console.error("error loading teachers" + err)
    })
  }

}
