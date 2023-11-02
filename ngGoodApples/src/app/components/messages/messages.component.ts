import { Reflection } from './../../models/reflection';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Message } from 'src/app/models/message';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';
import { User } from 'src/app/models/user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent {
  newMessage: Message = new Message();

  messages: Message[] = [];
  loggedInUser: User = new User();

  teacherContacts: User[] = [];
  parentContacts: User[] = [];

  selectedReplies: Message[] | null = null;

  selectedRecipient: User | null = null;
  replyMessage: Message = new Message();
  messageInReply: Message = new Message();

  conversations: Map<number, Message[]> = new Map();

  threads: Message[][] = [];

  selectedThread: Message[] | null = null;

  constructor(
    public auth: AuthService,
    private router: Router,
    private messageService: MessageService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    if (!this.auth.checkLogin()) {
      this.router.navigateByUrl('mustBeLoggedIn');
    }
    this.auth.getLoggedInUser().subscribe({
      next: (user) => {
        this.loggedInUser = user;

        console.log('USER');
        console.log(this.loggedInUser.firstName);

        this.loadAllMessages();

        this.loadAllTeacherContacts();
        this.loadAllParentContacts();
      },
      error: (oops) => {
        console.error(
          'ParentComponent.getLoggedInUser() failed getting logged in user'
        );
        console.error(oops);
      },
    });
  }

  loadAllMessages() {
    this.messageService.index().subscribe({
      next: (messages) => {
        this.messageService.listOfMessages = messages;
        this.messageService.indexUnread().subscribe({
          next: (msgs) => {
            this.messageService.listOfUnreadMessages = msgs;
          },
          error: (oops) => console.error(oops),
        });
        this.messages = messages.reverse();
        console.log(messages);
        this.makeThreadsFromMessages();
        this.loadThreads();
      },
      error: (oops) => {
        'ParentComponent.loadAllMessages() failed getting messages' + oops;
      },
    });
  }

  createNewMessage(message: Message) {
    let recipientId = message.recipient?.id;
    if (recipientId) {
      this.messageService.create(message, recipientId).subscribe({
        next: (createdMessage) => {
          location.reload();
        },
        error: (oops) => {
          'Messagecomponent.createNewMessage() failed creating message' + oops;
        },
      });
    }
  }

  replyToMessage(message: Message) {
    //let recipientId = message.recipient.id;
    let recipientId = this.selectedRecipient?.id;
    message.messageToReplyTo = this.replyMessage;
    if (recipientId) {
      this.messageService.create(message, recipientId).subscribe({
        next: (createdMessage) => {
          this.ngOnInit();
        },
        error: (oops) => {
          'Messagecomponent.createNewMessage() failed creating message' + oops;
        },
      });
    }
  }

  loadAllTeacherContacts() {
    this.messageService.indexTeachers().subscribe({
      next: (teachers) => {
        this.teacherContacts = teachers;
      },
      error: (err) => console.error('error loading teachers' + err),
    });
  }

  loadAllParentContacts() {
    this.messageService.indexParents().subscribe({
      next: (parents) => {
        this.parentContacts = parents;
      },
      error: (err) => console.error('error loading parents ' + err),
    });
  }

  testRoleParent(): boolean {
    return this.loggedInUser.role === 'parent';
  }

  testRoleTeacher(): boolean {
    return this.loggedInUser.role === 'teacher';
  }

  showAllReplies(messageId: number) {
    this.messageService.indexReplies(messageId).subscribe({
      next: (replies) => {
        this.selectedReplies = replies;
        console.log(replies);
      },
      error: (err) => console.error("can't show all replies... " + err),
    });
  }

  loadReplyMessage(message: Message) {
    this.replyMessage = message;
    console.log('REPLY MESSAGE');
    console.log(message);
  }

  log(x: any) {
    console.log(x);
  }

  makeThreadsFromMessages() {
    let msgs = this.messages;
    this.conversations = new Map();
    let me = this.loggedInUser.id;
    for (let msg of msgs) {
      let id = msg.recipient.id === me ? msg.sender.id : msg.recipient.id;
      if (this.conversations.has(id)) {
        this.conversations.get(id)?.push(msg);
      } else {
        this.conversations.set(id, [msg]);
      }
    }
  }

  loadThreads() {
    this.conversations.forEach((v, k) => {
      let acc: Message[] = [];
      v.forEach((m) => {
        acc.push(m);
      });
      this.threads.push(acc);
    });
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  fromSomeoneElse(message: Message): boolean {
    return !(message.sender.id === this.loggedInUser.id);
  }

  /*
   * Mark all as read should only mark messages where
   * the current user is not the sender of that message.
   * so as not to mess with the other person's notion of read.
   */
  markAllAsReadRec(msg: Message | null) {
    if (msg === null) {
      return;
    } else if (msg.sender.id === this.loggedInUser.id) {
      this.markAllAsReadRec(msg.messageToReplyTo); // skip
    } else {
      msg.seen = true;
      this.markAllAsReadRec(msg.messageToReplyTo);
    }
  }

  markAllAsRead(msg: Message) {
    this.markAllAsReadRec(msg);
    this.messageService.updateThreadRead(msg).subscribe({
      next: (msg) => {
        console.log('todo: refresh');
      },
      error: (err) => console.error('mark all as read' + err),
    });
  }

  flipRead(msg: Message) {
    msg.seen = !msg.seen;
    console.log(msg);
    this.messageService.updateRead(msg).subscribe({
      next: (msg) => {
        console.log('todo: refresh');
        this.loadAllMessages();
      },
      error: (err) => console.error('mark all as read' + err),
    });
  }
}
