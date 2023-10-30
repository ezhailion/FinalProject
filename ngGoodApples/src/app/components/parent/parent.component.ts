import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'src/app/models/message';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css'],
})
export class ParentComponent {
  newMessage: Message = new Message();
  loggedInUser: User = new User();
  messages : Message [] = [];

  constructor(
    private auth: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    if (!this.auth.checkLogin()) {
      this.router.navigateByUrl('mustBeLoggedIn');
    }
    this.auth.getLoggedInUser().subscribe({
      next: (user) => {
        this.loggedInUser = user;
      },
      error: (oops) => {
        console.error(
          'ParentComponent.getLoggedInUser() failed getting logged in user'
        );
        console.error(oops);
      },
    });
    this.loadAllMessages();
  }

  loadAllMessages() {
    this.messageService.index().subscribe({
      next: (messages) => {
        this.messages = messages;
      },
      error: (oops) => {
        'ParentComponent.loadAllMessages() failed getting messages' + oops
      }
    })
  }

  createNewMessage(message: Message, recipientId: number) {
    this.messageService.create(message, recipientId).subscribe({
      next: (createdMessage) => {
        this.loadAllMessages();
      },
      error: (oops) => {
        'ParentComponent.createNewMessage() failed creating message' + oops
      }
    })
  }
}
